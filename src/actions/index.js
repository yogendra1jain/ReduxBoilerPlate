const sqlite3 = require('sqlite3').verbose();
let sql = "select * from ticker_info"
let dbsqlite = new sqlite3.Database('C:/Users/YO356344/Downloads/ticker.db_dec20_201', (err) => {
  if (err) {
    console.error(err.message);
  }
  else {
      dbsqlite.all(sql,[],(err,rows)=>
    {

      if(err)
      console.log("some error occured");
      else {
        console.log(rows.length);
  //       rows.forEach((row) => {
  //   console.log(row);
  // })
}
    })
  }

});
