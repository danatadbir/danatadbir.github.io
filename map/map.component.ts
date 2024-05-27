import {
  AfterViewInit,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { DashboardState } from 'src/app/Dashboard/data-access/dashboard.state';
import { getDashboardItem } from 'src/app/Dashboard/data-access/dashboard.selector';
import { IMap } from 'src/app/ct-shared/utils/models/map.interface';

interface IMarker {
  name?: string;
  position: google.maps.LatLngLiteral;
  topic?: string;
  read?: string;
  write?: string;
  color: { url: string; scaledSize: google.maps.Size };
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent
  extends SharedFeaturesBaseComponent<IMap>
  implements AfterViewInit
{
  @ViewChildren(MapInfoWindow) infoWindowsView: QueryList<MapInfoWindow>;
  center = { lat: 43.65107, lng: -79.347015 };
  zoom = 13;
  mapOptions: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    mapTypeControl: false,
    mapId: `map_${this.id}`,
  };
  redMarkerIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    scaledSize: { width: 40, height: 40 } as google.maps.Size,
  };
  greenMarkerIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    scaledSize: { width: 40, height: 40 } as google.maps.Size,
  };
  yellowMarkerIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    scaledSize: { width: 40, height: 40 } as google.maps.Size,
  };
  markers: IMarker[] = [];
  // { name: 'Tim Hortons', position: { lat: 43.651070, lng: -79.347015 }, color: this.greenMarkerIcon },
  // { name: 'Starbucks', position: { lat: 43.653225, lng: -79.383186 }, color: this.greenMarkerIcon },
  // { name: 'Balzac’s Coffee Roasters', position: { lat: 43.653458, lng: -79.372714 }, color: this.redMarkerIcon },
  // { name: 'Dark Horse Espresso Bar', position: { lat: 43.646497, lng: -79.384667 }, color: this.yellowMarkerIcon },
  infoWindowOptions: google.maps.InfoWindowOptions = {
    maxWidth: 200,
  };
  infoWindowOpen: { [key: string]: boolean } = {};

  constructor(private store: Store<DashboardState>) {
    super();
  }

  openInfoWindow(marker: MapMarker, windowIndex: number) {
    let curIdx = 0;
    this.infoWindowsView.forEach((window: MapInfoWindow) => {
      if (windowIndex === curIdx) {
        window.open(marker);
        curIdx++;
      } else {
        window.close();
        curIdx++;
      }
    });
  }

  ngAfterViewInit() {
    this.safeObservable(this.store.select(getDashboardItem(this.id)))
      .pipe(
        map(item => {
          if (this.markers.length) this.markers = [];
          let config = this.config;
          if (item?.['content']?.config) {
            config = item['content'].config;
          }

          const options = config.view.options;
          this.mapOptions = {
            ...this.mapOptions, // Preserve existing options
            zoomControl: options.ZoomControl,
            scrollwheel: options.ScrollWheel,
            maxZoom: options.MaxZoom,
            minZoom: options.MinZoom,
          };

          if (config.content && config.content.length) {
            config.content.map((item, index) => {
              this.markers.push({
                name: item.device ? item.device : `Marker ${index + 1}`,
                position: { lat: item.latitude, lng: item.longitude },
                color: this.greenMarkerIcon,
                topic: item.topic?.name,
                read: item.outputs?.read?.name,
                write: item.outputs?.write?.name,
              });
            });
          }
        })
      )
      .subscribe();
  }
}
