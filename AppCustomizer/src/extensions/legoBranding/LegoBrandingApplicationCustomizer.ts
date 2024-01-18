/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseApplicationCustomizer,
} from '@microsoft/sp-application-base';

export interface ILegoBrandingApplicationCustomizerProperties {
  Top: string;
  Bottom: string;
}

export default class LegoBrandingApplicationCustomizer
  extends BaseApplicationCustomizer<ILegoBrandingApplicationCustomizerProperties> {

  public onInit(): Promise<void> {
    console.log('GREETINGS FROM THE APPLICATION CUSTOMIZER')

    return Promise.resolve();
  }
}
