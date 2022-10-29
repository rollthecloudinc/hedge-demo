import { hedge } from '@rollthecloudinc/hedge';

demoIt();
async function demoIt() {

  const h = await hedge({ service: "emissionless" }, {});
  const { service } = await h.service();
  const { region } = await h.region();
  
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

}