/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */

// Internal logic constants:
// They are namespaced and the only source of truth, which strengthens the application overall

export const constants = {
    mqttSetupSlice: 'mqttSetupSlice',
    mqttFilenamesSlice: 'mqttFilenamesSlice',
    languageSlice: 'languageSlice',
    messagesSlice: 'messagesSlice',
    selectedTopicSlice: 'lastMessageSlice',
    lastMessagesSlice: 'lastMessagesSlice',
    parentNodesSlice: 'parentNodesSlice',
    openedNodesSlice: 'openedNodesSlice',
    customizableSlice: 'customizableSlice',
    cardSlice: 'cardSlice',
    host: 'host',
    port: 'port',
    topic: 'topic',
    username: 'username',
    password: 'password',
    cacrt: 'cacrt',
    clientcrt: 'clientcrt',
    clientkey: 'clientkey',
    reloadEventSlice: 'reloadEventSlice',
    rootID: '-1',
    topicSeparator: '/',
    label: 'label',
    softCard: 'softCard',
    formCard: 'informationCard',
    messagesCard: 'messagesCard',
    treeCard: 'treeCard',
    lastMessageCard: 'lastMessageCard',
    emojiFile: '📄',
    emojiTree: '🌳',
    emojiSunglasses: '🕶️',
    emojiConnection: '📡',
    emojiEnvelop: '📨',
    emojiOkg: '👌',
    emojiSmile: '😀',
    emojiWink: '😉',
    emojiSadge: '☹️',
    xs: 480,
    sm: 768,
    md: 996,
    lg: 1200,
    xl: 1922,
    filename: 'filename'
};
