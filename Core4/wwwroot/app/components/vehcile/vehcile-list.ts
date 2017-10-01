
import { Component, OnInit } from "@angular/core";
import { KeyValuePair, Vehcile } from "../../model/vehcile/vehcile";
import { vehcileService } from "../../services/vehcile/vehcile.service";
import { AuthService } from "../../services/vehcile/auth.service";




@Component({
    selector: "vehcile-list",
    templateUrl: "/home/VehcileList"
    ,
    providers: [
        vehcileService
    ]
})


export class VehcileListComponent implements OnInit {
    


    constructor(private vechileService: vehcileService, private auth: AuthService) { }

    private readonly PAGE_SIZE = 10;


    queryResult: any = {};
    allVehciles: Vehcile[];
    makes: KeyValuePair[];
    masdf: any[];
    query: any = {
        MakeId: null,
        pageSize: this.PAGE_SIZE
    };

    columns: any = [
        { title: 'Id' },
        
        { title: 'Make', key: 'make', isSortable: true },
        { title: 'Model', key: 'model', isSortable: false },
        { title: 'Contact Name', key: 'contactName', isSortable: true },
        {}
    ]

    ngOnInit() {

        //For client side filtering
        //this.vechileService.getVehciles(this.filter).subscribe(vehciles => this.myvehciles = this.allVehciles = vehciles);
        // this.vechileService.getVehciles(this.filter).subscribe(vehciles => this.myvehciles = this.allVehciles = vehciles);
        this.populateVehciles();
        this.vechileService.getMakes().subscribe(makes => this.makes = makes);
    }


    private populateVehciles() {

        this.vechileService.getVehciles(this.query).subscribe(result => {
            this.queryResult = result;
            
        });
    }

    onFilterChange() {


        this.query.page = 1;
    //    this.query.pageSize = this.PAGE_SIZE;
       this. populateVehciles();
        //If client side filtering
        //this.myvehciles. = this.filter.MakeId;
        /*var vehciles = this.allVehciles;

        if (this.filter.MakeId)
            vehciles = vehciles.filter(v => v.make.id == this.filter.MakeId);

        this.myvehciles = vehciles;
        */
    }

    resetFilter() {
        debugger
        this.query = {
            page: 1,
            pageSize: this.PAGE_SIZE
        };

        this.populateVehciles();
        
    }


    sortBy(columnName: any) {
        
        if (this.query.sortBy === columnName)
        {
            this.query.isSortAscending = !this.query.isSortAscending;

        } else {
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }

        this.populateVehciles();
    }

    onPageChange(page: any) {
        this.query.page = page;
        this.populateVehciles();

    }

}

