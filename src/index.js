import { hedge, Hedge, Service } from '@rollthecloudinc/hedge';

demoIt();
async function demoIt() {

  const h = await hedge({ service: "octostore" }, {});
  const { service } = await h.service();
  const { region } = await h.region({});
  
  console.log('service', service);
  console.log('region', region);

  const { serviceDocument } = await service.document()
  const { regionDocument } = await region.document();

  console.log('service document', serviceDocument);
  console.log('region document', regionDocument);

  // NOTE: bounce has the same api as fetch except no protocol or domain is needed.
  const res = await h.bounce('/adlistitems/', {});

  console.log('bounced response from ' + regionDocument.region, res);

  const { difference } = await region.compare({ region: 'useast' });
  console.log(`region ${regionDocument.region} grid carbon intensity difference to useast`, difference);

  // Configure inline service
  const customService = {
    id: "custom",
    defaultRegion: "eastus",
    regions: [
      {
        origin: "eastus.rollthecloud.com",
        region: "eastus",
        paths: [
          "**adlistitems**"
        ]
      },
      {
        origin: "westus.rollthecloud.com",
        region: "westus",
        paths: [
          "**westusonly**"
        ]
      },
    ]
  };

  const s2 = new Service({ document: customService });
  const h2 = new Hedge({ service: s2 });
  const { region: region1 } = await h2.region({ path: '/adlistitems/' });
  const { region: region2 } = await h2.region({ path: '/westusonly/' });
  console.log("custom region1", region1);
  console.log("custom region2", region2);

}