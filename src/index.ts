import "reflect-metadata";
import { createConnection } from "typeorm";
import { Catalog } from "./entity/Catalog";

createConnection().then(async connection => {

    let catalog = new Catalog();

    catalog.journal = "Oracle Magazine";
    catalog.publisher = "Oracle Publishing";
    catalog.edition = "March-April 2005";
    catalog.title = "Starting with Oracle ADF";
    catalog.author = "Steve Muench";
    catalog.isPublished = true;   
    
    await connection.manager.save(catalog);

    console.log(`Catalog has been saved \n`);

}).catch(error => console.log(error));
