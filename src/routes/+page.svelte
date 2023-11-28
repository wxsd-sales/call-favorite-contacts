<script>
  import {PUBLIC_OAUTH_URL,PUBLIC_CLIENT_ID,PUBLIC_REDIRECT_URL} from '$env/static/public';

  const oauthUrl = PUBLIC_OAUTH_URL; // Webex OAuth URL
  const clientId = PUBLIC_CLIENT_ID;
  const redirectUri = PUBLIC_REDIRECT_URL;
  const responseType = 'token';
  const scope = 'spark:all';

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: responseType,
      scope: scope,
    });

    // Construct the OAuth URL
    const href = `${oauthUrl}?${params}`;
</script>

<section class="container p-4 is-align-items-center vertical-center" id="login">
    <div class="column is-12">
      <a class="button is-rounded is-medium is-fullwidth is-info has-text-weight-bold" type="button" {href}>
        <span>Login with Webex</span>
      </a>
    </div>
</section>
<style>
    .vertical-center {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>