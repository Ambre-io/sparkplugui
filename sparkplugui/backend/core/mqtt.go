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
	
	fmt.Printf("### NewTLSConfig => \n%+v\n\n", tlsCertificates)

	// Load certificates
	certpool := x509.NewCertPool()
	certpool.AppendCertsFromPEM([]byte(tlsCertificates.CACrt))

	// Load client certificate and key
	cert, err := tls.LoadX509KeyPair(tlsCertificates.ClientCrt, tlsCertificates.ClientKey)
	if err != nil {
		// TODO find a way to throw error
		panic(err)
	}

	// Create tls.Config with desired tls properties
	return &tls.Config{
		// RootCAs = certs used to verify server cert.
		RootCAs: certpool,
		// ClientAuth = whether to request cert from server. Since the server is set up for SSL, this happens anyways.
		ClientAuth: tls.NoClientCert,
		// ClientCAs = certs used to validate client cert.
		ClientCAs: nil,
		// InsecureSkipVerify = verify that cert contents match server. IP matches what is in cert etc.
		InsecureSkipVerify: true,
		// Certificates = list of certs client sends to server.
		Certificates: []tls.Certificate{cert},
	}
}
