import queryString from 'query-string';

class OAuth {
  static providers = [{
    name: 'github',
    url: '/api/oauth/spotify',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    scope: 'user-read-email',
    clientId: '17afe3d1cb164ab9b778a06593fdc2a3'
  }];

  static getAuthLink(provider) {
    const qs = {
      scope: provider.scope,
      client_id: provider.clientId,
      redirect_uri: window.location.href
    };

    return `${provider.authEndpoint}?${queryString.stringify(qs)}`;
  }

  static getProvider(providerName) {
    const provider = this.providers.find(provider => provider.name === providerName);
    provider.authLink = this.getAuthLink(provider);
    return provider;
  }
}

export default OAuth;
