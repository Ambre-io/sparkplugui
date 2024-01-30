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
    // Internal logic
    rootID: '-1',
    topicSeparator: '/',
    // Slices
    cardSlice: 'cardSlice',
    customizableSlice: 'customizableSlice',
    languageSlice: 'languageSlice',
    lastMessagesSlice: 'lastMessagesSlice',
    mqttSetupSlice: 'mqttSetupSlice',
    mqttFilenamesSlice: 'mqttFilenamesSlice',
    messagesSlice: 'messagesSlice',
    parentNodesSlice: 'parentNodesSlice',
    openedNodesSlice: 'openedNodesSlice',
    reloadEventSlice: 'reloadEventSlice',
    selectedTopicSlice: 'selectedTopicSlice',
    // Fields
    host: 'host',
    port: 'port',
    topic: 'topic',
    username: 'username',
    password: 'password',
    cacrt: 'cacrt',
    clientcrt: 'clientcrt',
    clientkey: 'clientkey',
    // Cards
    softCard: 'softCard',
    formCard: 'informationCard',
    messagesCard: 'messagesCard',
    treeCard: 'treeCard',
    lastMessageCard: 'lastMessageCard',
    // Emojis
    emojiFile: '📄',
    emojiTree: '🌳',
    emojiSunglasses: '🕶️',
    emojiConnection: '📡',
    emojiEnvelop: '📨',
    emojiOkg: '👌',
    emojiSmile: '😀',
    emojiWink: '😉',
    emojiSadge: '☹️',
    // Screen sizes
    xs: 480,
    sm: 768,
    md: 996,
    lg: 1200,
    xl: 1922,
    // LocalStorage prefixed keys (for clarity & security)
    sparkplugui_layouts: 'sparkplugui_layouts',
    sparkplugui_host: 'sparkplugui_host',
    sparkplugui_port: 'sparkplugui_port',
    sparkplugui_topic: 'sparkplugui_topic',
    sparkplugui_language: 'sparkplugui_language',
    // Event listener
    beforeunload: 'beforeunload',
};
