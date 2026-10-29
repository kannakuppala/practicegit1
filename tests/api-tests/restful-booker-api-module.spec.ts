import { request } from 'node:http';
import { expect, test } from '../../fixtures/hooks-fixture';
import apipath from '../../test-data/api-data/api-path-data.json';
import apidata from '../../test-data/api-data/restful-booker-api-module-data.json';
import { ok } from 'node:assert';

test('GET request to retrieve booking details', async ({ request}) => {
  const response = await request.get(apipath.booking_path);
  await expect(response.status()).toBe(200);  
  console.log(await response.json());
});
test('API Test2', async ({ request }) => {
    const response1=await request.get(`${apipath.booking_path}/${apidata.booking_id}`);
    await expect(response1.status()).toBe(200);
    console.log(await response1.json());
});
test('API Test3', { 
  tag: ['@smoke', '@regression','@API'], 
},
   async ({ request }) => {
      const bookingResponse = await request.get(apipath.booking_path);
      const bookingresponsejson = await bookingResponse.json();
      console.log(bookingresponsejson);
      await expect(bookingResponse.status()).toBe(200);
      await expect(bookingResponse.statusText()).toBe('OK');
      await expect(bookingResponse.headers()['content-type']).toContain(apidata['content-type']);
   });
   test('API Test4' , {
    tag:['@API' , '@smoke'],
   },
   async({request})=>{
     const bookingres=await request.get(`${apipath.booking_path}/${apidata.booking_id}`)
     const bookinjsonres=await bookingres.json();
     console.log(bookinjsonres);
     await expect(bookingres.status()).toBe(200);
     await expect(bookingres.statusText()).toBe('OK');
     await expect(bookingres).not.toBeNull();
     await expect(bookinjsonres.firstname).toEqual(apidata.firstname);

   })
   test('POST API 5',{
    tag:['@API','@smoke'],
   },
   async({request})=>{
   const createBookingRest= await request.post(apipath.booking_path,{
      data:apidata.create_booking
})  
        const createBookingRestjson=await createBookingRest.json();
        await expect(createBookingRest.status()).toBe(200);
        await expect(createBookingRestjson.booking).toMatchObject(apidata.create_booking);
   });
   test('PUT API 6' ,{
    tag:['@API','@smoke'],
   },async({request})=>{

      const updatedres=await request.put(`${apipath.booking_path}.${apidata.booking_id2}`,{
       headers:{
        Authorization:"Basic "
       }
      });
       const updatedJsonres=await updatedres.json();
       console.log(updatedJsonres);
       await expect(updatedres.status()).toBe(200);
       await expect(updatedres.statusText()).toBe("OK");

   });