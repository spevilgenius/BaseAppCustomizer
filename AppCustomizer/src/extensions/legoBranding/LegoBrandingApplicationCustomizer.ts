import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import { getVueDOMElementHTML } from '../../lib/ExtensionProperties';

import * as strings from 'LegoBrandingApplicationCustomizerStrings';
import styles from './LegoBrandingApplicationCustomizer.module.scss';

import { renderHeader } from "../assets/header/appcode/index-3abfc43c.js";
import "../assets/header/appcode/index-d86498b9.css";

import { renderFooter } from "../assets/footer/appcode/index-99cc7464.js";
import "../assets/footer/appcode/index-b5d91f26.css";

const LOG_SOURCE: string = 'LegoBrandingApplicationCustomizer';

export interface ILegoBrandingApplicationCustomizerProperties {
  Top: string;
  Bottom: string;
  EditMode: boolean;
  webtitle: string;
  weburl: string;
  siteurl: string;
}

const headerID = "VueHeader"
const footerID = "VueFooter"

/** A Custom Action which can be run during execution of a Client Side Application */
export default class LegoBrandingApplicationCustomizer
  extends BaseApplicationCustomizer<ILegoBrandingApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  private _renderPlaceHolders(): void {
    console.log("LegoBrandingApplicationCustomizer._renderPlaceHolders()");
    /* console.log(
      "Available placeholders: ",
      this.context.placeholderProvider.placeholderNames
        .map(name => PlaceholderName[name])
        .join(", ")
    ); */

    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
  
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }

      if (this._topPlaceholder.domElement) {
        const instanceId = this.context.instanceId
        this._topPlaceholder.domElement.innerHTML = getVueDOMElementHTML(headerID, this.properties, instanceId)
        renderHeader(`#${headerID}`)
      }
    }
  
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );
  
      if (!this._bottomPlaceholder) {
        console.error("The expected placeholder (Bottom) was not found.");
        return;
      }

      if (this._bottomPlaceholder.domElement) {
        this._bottomPlaceholder.domElement.innerHTML = `
        <div class="${styles.app}">
          <div class="${styles.bottom}">
            <div id="VueFooter"></div>
          </div>
          <div style="display: none;" id="ContextInfo"></div>
        </div>
        `;
        renderFooter(`#${footerID}`)
      }
    }
  }

  private _onDispose(): void {
    console.log('[LegoBrandingApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.properties.webtitle = this.context.pageContext.web.title
    this.properties.weburl = this.context.pageContext.web.absoluteUrl
    this.properties.siteurl = this.context.pageContext.site.absoluteUrl

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }
}
