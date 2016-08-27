import {StockService} from "./services/stock.service";
import {Injectable} from "@angular/core";
import {WineComService, WineComSearchResult} from "./services/wineCom.service";
import {Wine} from "./entities/Wine";
import {Observable} from "rxjs/Rx";
import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {Store} from "@ngrx/store";
import {updateWine, removeWine, updateRateWine, updateStockWine} from "../statemanagement/actionCreators";
@Injectable()
export class StockSandbox {
    wines$ = this.store.select(state => state.data.wines);

    constructor(private store: Store<ApplicationState>, private stockService: StockService, private wineComService: WineComService) {
    }

    addWine(wine: Wine): void {
        this.stockService.add(wine);
    }

    updateWine(id: string, wine: Wine): void {
        this.stockService.update(id, wine);
        this.store.dispatch(updateWine(id, wine));
    }

    fetchWine(id: string): Observable<Wine> {
        return this.stockService.fetchWine(id);
    }

    removeWine(wine: Wine): void {
        this.stockService.remove(wine);
        this.store.dispatch(removeWine(wine._id));
    }

    setRate(wine: Wine, rate: number): void {
        this.stockService.setRate(wine, rate);
        this.store.dispatch(updateRateWine(wine._id, rate));
    }

    setStock(wine: Wine, inStock: number): void {
        this.stockService.setStock(wine, inStock);
        this.store.dispatch(updateStockWine(wine._id, inStock));
    }

    search(term: string): Observable<WineComSearchResult> {
        return this.wineComService.search(term);
    }
}