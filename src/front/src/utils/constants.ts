// Internal logic constants:
// They are namespaced and the only source of truth, which strengthens the application overall

export const constants = {
    mqttDataSlice: 'mqttDataSlice',
    languageSlice: 'languageSlice',
    messagesSlice: 'messagesSlice',
    selectedTopicSlice: 'lastMessageSlice',
    lastMessagesSlice: 'lastMessagesSlice',
    parentNodesSlice: 'parentNodesSlice',
    expandedNodesSlice: 'expandedNodesSlice',
    availableLanguages: ['fr', 'en', 'de'],
    host: 'host',
    port: 'port',
    username: 'username',
    password: 'password',
    topic: 'topic',
    reloadEventSlice: 'reloadEventSlice',
    rootID: '-1',
    topicSeparator: '/',
    label: 'label'
};
