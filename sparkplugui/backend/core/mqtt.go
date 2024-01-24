/*
 * Copyright (c) 2021 IBM Corp and others.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *    https://www.eclipse.org/legal/epl-2.0/
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *    Seth Hoenig
 *    Allan Stockdill-Mander
 *    Mike Robertson
 *
 * Repository:
 * 	  https://github.com/eclipse/paho.mqtt.golang/blob/master/cmd/ssl/main.go
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

package core

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
)

func NewTLSConfig(tlsCertificates MQTTTLSCertificates) *tls.Config {

	fmt.Printf("### NewTLSConfig => \nlen CACrt=%d, len ClientCrt=%d, len ClientKey=%d\n\n", len(tlsCertificates.CACrt), len(tlsCertificates.ClientCrt), len(tlsCertificates.ClientKey))

	// Load certificates
	certificatepool := x509.NewCertPool()
	//strToByte := []byte(fmt.Sprintf("[%s]", tlsCertificates.CACrt))
	strToByte := []byte(tlsCertificates.CACrt)
	certificatepool.AppendCertsFromPEM(strToByte)

	clientByte := []byte(tlsCertificates.ClientCrt)
	//var clientCrtFile []byte
	//err := json.Unmarshal(clientByte, &clientCrtFile)
	//if err != nil {
	//	fmt.Printf("\n### CLIENT CRT UNMARSHAL PANIC\n\n")
	//	panic(err)
	//}
	//clientFile, _ := os.ReadFile(clientCrtFile)

	clientKeyByte := []byte(tlsCertificates.ClientKey)
	//var clientKey []byte
	//err = json.Unmarshal(clientKeyByte, &clientKey)
	//if err != nil {
	//	fmt.Printf("\n### CLIENT CRT UNMARSHAL PANIC\n\n")
	//	panic(err)
	//}
	//clientKeyFile, _ := os.ReadFile(clientKey)

	// Load client certificate and key
	certificate, err := tls.X509KeyPair(clientByte, clientKeyByte)
	//certificate, err := tls.LoadX509KeyPair(tlsCertificates.ClientCrt, tlsCertificates.ClientKey)
	if err != nil {
		fmt.Printf("\n### COULD NOT LOAD KEY PAIR WITH X509KeyPair\n\n")
		panic(err)
	}

	// Create tls.Config with desired tls properties
	return &tls.Config{
		// RootCAs = certificates used to verify server certificate.
		RootCAs: certificatepool,
		// ClientAuth = whether to request certificate from server. Since the server is set up for SSL, this happens anyways.
		ClientAuth: tls.NoClientCert,
		// ClientCAs = certificates used to validate client certificate.
		ClientCAs: nil,
		// InsecureSkipVerify = verify that certificate contents match server. IP matches what is in certificate etc.
		InsecureSkipVerify: true,
		// Certificates = list of certificates client sends to server.
		Certificates: []tls.Certificate{certificate},
	}
}
