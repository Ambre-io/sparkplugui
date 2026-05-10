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

// NewTLSConfig builds a *tls.Config from the setup fields.
//
// Three modes:
//   - No certs at all  → use system cert pool (valid for public brokers like HiveMQ / mosquitto).
//   - CA cert only     → custom CA pool, no client cert (server-side TLS verification).
//   - CA + client cert + key → mutual TLS.
//
// Returns (nil, errCode) on certificate parsing failure.
func NewTLSConfig(setup MQTTSetup) (*tls.Config, string) {
	hasCA := setup.CACrt != ""
	hasClientCert := setup.ClientCrt != "" && setup.ClientKey != ""

	cfg := &tls.Config{
		ClientAuth: tls.NoClientCert,
	}

	if !hasCA && !hasClientCert {
		// Use the system cert pool — works for brokers with valid public CAs.
		cfg.RootCAs = nil
		fmt.Println("### TLS: using system cert pool (no custom CA provided)")
		return cfg, ""
	}

	if hasCA {
		pool := x509.NewCertPool()
		if ok := pool.AppendCertsFromPEM([]byte(setup.CACrt)); !ok {
			fmt.Println("### TLS: failed to parse CA certificate PEM")
			return nil, ErrTLSConfig
		}
		cfg.RootCAs = pool
		fmt.Println("### TLS: custom CA certificate loaded")
	}

	if hasClientCert {
		cert, err := tls.X509KeyPair([]byte(setup.ClientCrt), []byte(setup.ClientKey))
		if err != nil {
			fmt.Printf("### TLS: failed to parse client cert/key pair: %s\n", err)
			return nil, ErrTLSConfig
		}
		cfg.Certificates = []tls.Certificate{cert}
		fmt.Println("### TLS: client certificate loaded (mutual TLS)")
	}

	return cfg, ""
}
