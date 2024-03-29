/*
Sparkplug 3.0.0
Note: Complies to v3.0.0 of the Sparkplug specification
      to the extent needed for Winsonic DataIO and other industrial 4.0 products.
Copyright (c) 2023 Winsonic Electronics, Taiwan
@author David Lee
@repository https://github.com/weekaung/sparkplugb-client

* This program and the accompanying materials are made available under the
* terms of the Eclipse Public License 2.0 which is available at
* http://www.eclipse.org/legal/epl-2.0.
*/

/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */

package sparkplug

import (
	"fmt"
	"google.golang.org/protobuf/proto"
	"sparkplugui/backend/sparkplug/sproto"
	"time"
)

// see the JavaScipt version to be inspired:
// https://github.com/eclipse/tahu/blob/master/javascript/core/sparkplug-payload/lib/sparkplugbpayload.ts

type Metric struct {
	Name     string
	DataType string
	Value    any
}

type Payload struct {
	Timestamp time.Time
	Seq       uint64
	Metrics   []Metric
}

// TODO rewrite it with Metric.DataType as string
//func (p *Payload) EncodePayload(isDeathPayload bool) ([]byte, error) {
//	now := time.Now().UnixMilli()
//	ms := []*sproto.Payload_Metric{}
//
//	for i, m := range p.Metrics {
//		sm := sproto.Payload_Metric{}
//		sm.Name = &p.Metrics[i].Name
//		dt := m.DataType.toUint32()
//		sm.Datatype = &dt
//		/**********************************
//		TypeInt DataType = 10
//		TypeFloat DataType = 12
//		TypeBool DataType = 14
//		TypeString DataType = 15
//		**********************************/
//		switch m.DataType {
//		case TypeInt:
//			iv, err := strconv.ParseUint(m.Value, 10, 64)
//			if err != nil {
//				return nil, err
//			}
//			sm.Value = &sproto.Payload_Metric_IntValue{IntValue: uint32(iv)}
//		case TypeFloat:
//			fv, err := strconv.ParseFloat(m.Value, 32)
//			if err != nil {
//				return nil, err
//			}
//			sm.Value = &sproto.Payload_Metric_FloatValue{FloatValue: float32(fv)}
//		case TypeBool:
//			bv, err := strconv.ParseBool(m.Value)
//			if err != nil {
//				return nil, err
//			}
//			sm.Value = &sproto.Payload_Metric_BooleanValue{BooleanValue: bv}
//		case TypeString:
//			sm.Value = &sproto.Payload_Metric_StringValue{StringValue: m.Value}
//		}
//		//fmt.Println(*sm.Name, "=", sm.Value)
//		ms = append(ms, &sm)
//	}
//	//fmt.Println("---------")
//
//	sp := sproto.Payload{}
//
//	if !isDeathPayload {
//		// Set Payload timestamp
//		tn := uint64(now)
//		sp.Timestamp = &tn
//		// Set Payload sequence
//		sp.Seq = &p.Seq
//	}
//	sp.Metrics = ms
//	return proto.Marshal(&sp)
//}

func (p *Payload) DecodePayload(bytes []byte) error {

	pl := sproto.Payload{}
	err := proto.Unmarshal(bytes, &pl)

	if err != nil {
		return err
	}

	if pl.Timestamp != nil {
		p.Timestamp = time.UnixMilli(int64(*pl.Timestamp))
	}

	p.Metrics = make([]Metric, len(pl.Metrics))

	for i := range pl.Metrics {

		// Set the Name and DataType
		p.Metrics[i].Name = *pl.Metrics[i].Name
		p.Metrics[i].DataType = sproto.DataType_name[int32(*pl.Metrics[i].Datatype)]
		if *pl.Metrics[i].Datatype >= uint32(len(sproto.DataType_name)) {
			fmt.Printf("Warning: could not find metric number=%d in sproto.FriendlyDataTypes\n", *pl.Metrics[i].Datatype)
		}

		// Set the Value according to DataType
		switch sproto.DataType(*pl.Metrics[i].Datatype) {

		case sproto.DataType_Int8, sproto.DataType_UInt8,
			sproto.DataType_Int16, sproto.DataType_UInt16,
			sproto.DataType_Int32, sproto.DataType_UInt32:
			p.Metrics[i].Value = pl.Metrics[i].GetIntValue()
		case sproto.DataType_Int64, sproto.DataType_UInt64:
			p.Metrics[i].Value = pl.Metrics[i].GetLongValue()
		case sproto.DataType_Float, sproto.DataType_Double:
			p.Metrics[i].Value = pl.Metrics[i].GetDoubleValue()
		case sproto.DataType_Boolean:
			p.Metrics[i].Value = pl.Metrics[i].GetBooleanValue()
		case sproto.DataType_String, sproto.DataType_Text:
			p.Metrics[i].Value = pl.Metrics[i].GetStringValue()
		case sproto.DataType_Bytes:
			p.Metrics[i].Value = pl.Metrics[i].GetBytesValue()
		case sproto.DataType_DataSet:
			p.Metrics[i].Value = pl.Metrics[i].GetDatasetValue()
		case sproto.DataType_Template:
			p.Metrics[i].Value = pl.Metrics[i].GetTemplateValue()

		default:
			p.Metrics[i].Value = pl.Metrics[i].GetValue()
		}
	}

	return nil
}
