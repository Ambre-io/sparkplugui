/*
Sparkplug 3.0.0
Note: Complies to v3.0.0 of the Sparkplug specification
      to the extent needed for Winsonic DataIO and other industrial 4.0 products.
Copyright (c) 2023 Winsonic Electronics, Taiwan
@author David Lee

* This program and the accompanying materials are made available under the
* terms of the Eclipse Public License 2.0 which is available at
* http://www.eclipse.org/legal/epl-2.0.
*/

package sparkplug

import (
	"fmt"
	"google.golang.org/protobuf/proto"
	"sparkplugui/backend/sparkplug/sproto"
	"strconv"
	"time"
)

type Metric struct {
	Name     string
	DataType DataType
	// IntValue    int
	// FloatValue  float32
	// BoolValue   bool
	// StringValue string
	Value string
}

type DataType uint32

const (
	TypeInt    DataType = 3
	TypeFloat  DataType = 9
	TypeBool   DataType = 11
	TypeString DataType = 12
)

func (d *DataType) String() string {
	switch *d {
	case TypeInt:
		return "TypeInt"
	case TypeFloat:
		return "TypeFloat"
	case TypeBool:
		return "TypeBool"
	case TypeString:
		return "TypeString"
	}

	fmt.Println(int(d.toUint32()))
	return "error"
}

func (d DataType) toUint32() uint32 {
	return uint32(d)
}

type Payload struct {
	Timestamp time.Time
	Seq       uint64
	Metrics   []Metric
}

func (p *Payload) EncodePayload(isDeathPayload bool) ([]byte, error) {
	now := time.Now().UnixMilli()
	ms := []*sproto.Payload_Metric{}

	for i, m := range p.Metrics {
		sm := sproto.Payload_Metric{}
		sm.Name = &p.Metrics[i].Name
		dt := m.DataType.toUint32()
		sm.Datatype = &dt
		/**********************************
		TypeInt DataType = 10
		TypeFloat DataType = 12
		TypeBool DataType = 14
		TypeString DataType = 15
		**********************************/
		switch m.DataType {
		case TypeInt:
			iv, err := strconv.ParseUint(m.Value, 10, 64)
			if err != nil {
				return nil, err
			}
			sm.Value = &sproto.Payload_Metric_IntValue{IntValue: uint32(iv)}
		case TypeFloat:
			fv, err := strconv.ParseFloat(m.Value, 32)
			if err != nil {
				return nil, err
			}
			sm.Value = &sproto.Payload_Metric_FloatValue{FloatValue: float32(fv)}
		case TypeBool:
			bv, err := strconv.ParseBool(m.Value)
			if err != nil {
				return nil, err
			}
			sm.Value = &sproto.Payload_Metric_BooleanValue{BooleanValue: bv}
		case TypeString:
			sm.Value = &sproto.Payload_Metric_StringValue{StringValue: m.Value}
		}
		//fmt.Println(*sm.Name, "=", sm.Value)
		ms = append(ms, &sm)
	}
	//fmt.Println("---------")

	sp := sproto.Payload{}

	if !isDeathPayload {
		// Set Payload timestamp
		tn := uint64(now)
		sp.Timestamp = &tn
		// Set Payload sequence
		sp.Seq = &p.Seq
	}
	sp.Metrics = ms
	return proto.Marshal(&sp)
}

func (p *Payload) DecodePayload(bytes []byte) error {
	pl := sproto.Payload{}
	err := proto.Unmarshal(bytes, &pl)
	if err != nil {
		return err
	}
	// fmt.Println("Payload is ", pl.String())
	if pl.Timestamp != nil {
		p.Timestamp = time.UnixMilli(int64(*pl.Timestamp))
	}
	p.Metrics = make([]Metric, len(pl.Metrics))
	for i := range pl.Metrics {
		p.Metrics[i].Name = *pl.Metrics[i].Name
		p.Metrics[i].DataType = DataType(*pl.Metrics[i].Datatype)
		// Set the Value according to DataType
		switch p.Metrics[i].DataType {
		case TypeInt:
			p.Metrics[i].Value = strconv.FormatUint(uint64(pl.Metrics[i].GetIntValue()), 10)
		case TypeFloat:
			p.Metrics[i].Value = fmt.Sprintf("%f", pl.Metrics[i].GetFloatValue())
		case TypeBool:
			p.Metrics[i].Value = strconv.FormatBool(pl.Metrics[i].GetBooleanValue())
		case TypeString:
			p.Metrics[i].Value = pl.Metrics[i].GetStringValue()
		}
	}
	return nil
}
