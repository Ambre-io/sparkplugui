// Internal logic constants:
// They are namespaced and the only source of truth, which strengthens the application overall

export const constants = {
    mqttDataSlice: 'mqttDataSlice',
    languageSlice: 'languageSlice',
    availableLanguages: ['fr', 'en', 'de'].sort(),
    host: 'host',
    port: 'port',
    username: 'username',
    password: 'password',
    topic: 'topic'
};
