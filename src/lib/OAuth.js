import queryString from 'query-string';

class OAuth {
  static providers = [{
    name: 'spotify',
    url: '/api/oauth/spotify',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    token_type: 'Bearer',
    scope: ['user-read-private user-read-email playlist-modify-public playlist-modify-private'],
    clientId: '17afe3d1cb164ab9b778a06593fdc2a3'
  }];

  static getAuthLink(provider) {
    const qs = {
      scope: provider.scope,
      client_id: provider.clientId,
      redirect_uri: window.location.href,
      response_type: 'code'
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
