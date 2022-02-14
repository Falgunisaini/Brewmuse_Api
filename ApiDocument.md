Main Link: 

Page 1: Find a Store

Data to find a store: http://localhost:8210/store

Data to find a store w.r.t cityId (for using in map): http://localhost:8210/store?city_id=2

Data to find a store w.r.t cityname (for using in search bar): http://localhost:8210/store?city_name=Delhi

Data to find a store w.r.t store name (for using in search bar): http://localhost:8210/store?name=Punjabi Bagh


Page 2: Menu (Fetches data for coffee as well as food)

Menu data w.r.t category id: http://localhost:8210/item/1


Page 3: Careers

Jobs w.r.t CityId and Keyword/Profile:  http://localhost:8210/jobs?city_id=2&profile=Barista

Jobs w.r.t Cityname and Keyword: http://localhost:8210/jobs?city_name=Pune&profile=Barista

Jobs w.r.t CityId: http://localhost:8210/jobs?city_id=4

Jobs w.r.t CityName: http://localhost:8210/jobs?city_name=Delhi

Jobs w.r.t Keyword/Profile: http://localhost:8210/jobs?profile=Apprentice

Api for name animation (Post Call): http://localhost:8210/name

Fetching name for animation: http://localhost:8210/fetchname/620a32d2f173b2436e1192d0


Page 4: Coffee finder

Combinations of coffee for coffee finder: http://localhost:8210/ourcoffee/8    http://localhost:8210/ourcoffee/9      http://localhost:8210/ourcoffee/10


Page 5: Starbucks Delivers

Filter
 1) For Type (veg/Non-Veg): http://localhost:8210/filter/5?type=Vegetarian

 2) For Price: http://localhost:8210/filter/1?bprice=200&aprice=350

 3) For Ratings: http://localhost:8210/filter/5?arate=4   http://localhost:8210/filter/14?brate=4

 4) To place order (Post Call): http://localhost:8210/placeOrder 

 5) Menu item based on user's selection (Post Call): http://localhost:8210/menuItem

 6) Update Order (Put Call): http://localhost:8210/updateOrder/620a171210f46a95ecc712d2?status=SUCCESS

 7) Delete Order: http://localhost:8210/deleteOrder


Page 6: Rewards

List of gift cards: http://localhost:8210/cards/1

Gift card based on user's selection (Post Call): http://localhost:8210/giftcard 

Placing Order for gift cards (Post Call): http://localhost:8210/giftcardOrder 

Updating Order for gift cards (Put Call): http://localhost:8210/updategiftOrder/620a6fa338e79a9e1a6b0d11?status=SUCCESS

Delete Orders for gift cards: http://localhost:8210/deletegiftOrder
