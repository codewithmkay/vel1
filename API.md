# Velora API contract (edit `src/api/client.js` if yours differs)
Set `VITE_USE_MOCK=false` and `VITE_API_URL` in `.env`.

- `GET /products` -> `[{id,name,price,length,texture,color,lace,tone:[c1,c2],image,desc}]`
- `GET /products/:id` -> one product
- `GET /services` -> `[{id,name,price,minutes,desc}]`
- `GET /stylists` -> `[{id,name}]` (include `{id:"any"}`)
- `GET /availability?serviceId&stylistId&date=YYYY-MM-DD` -> `[{time:"09:00",available:true}]`
- `POST /bookings` body `{serviceId,stylistId,date,time,customer:{name,email,phone},wigId|null}` -> `{reference}`
- `POST /orders` body `{items:[{id,qty,price}],customer:{name,email,address},installation:boolean,total}` -> `{orderId}`
