import { output as pagespeed } from 'psi';
import configs from '../../configs';

export default function() {
  return function(cb) {
    // Update the below URL to the public URL of your site
    return pagespeed(
      configs.pagespeed.url,
      {
        strategy: configs.pagespeed.strategy,
        // By default we use the PageSpeed Insights free (no API key) tier.
        // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
        // key: 'YOUR_API_KEY'
      },
      cb,
    );
  };
}
