import * as React from 'react';
import styles from './PnPReactCarousel.module.scss';
import { IPnPReactCarouselProps } from './IPnPReactCarouselProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';
import { Carousel, CarouselButtonsLocation, CarouselButtonsDisplay } from "@pnp/spfx-controls-react/lib/Carousel";

let listItems : any = [];

export default class PnPReactCarousel extends React.Component<IPnPReactCarouselProps, {}> {

  public getListData() {
    jquery.ajax({
      url: this.props.siteUrl + `/_api/web/lists/getbytitle('Carousel')/items?$select=Title`,
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: resultData => listItems = (resultData.d.results as []).map((o:any)=> o.Title),
      error: error => {
          console.log(JSON.stringify(error));
        }
    });
  }

  public componentDidMount() {
    this.getListData();
  }

  public render(): React.ReactElement<IPnPReactCarouselProps> {
    return (
      <Carousel
        buttonsLocation={CarouselButtonsLocation.top}
        buttonsDisplay={CarouselButtonsDisplay.block}
        element={listItems}
        isInfinite={true}
        onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
        onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
      />
    );
  }
}
