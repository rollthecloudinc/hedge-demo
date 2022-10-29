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

}