/* eslint-disable @typescript-eslint/no-non-null-assertion */

import Cabin from '../assets/icons/tools/Cabin.png';
import Cloe from '../assets/icons/tools/Cloe.png';
import ComCCODirect from '../assets/icons/tools/ComCCODirect.png';
import CrewMobile from '../assets/icons/tools/CrewMobile.png';
import EasyRH from '../assets/icons/tools/EasyRH.png';
import eDossierPNC from '../assets/icons/tools/eDossierPNC.png';
import eRH from '../assets/icons/tools/eRH.png';
import FormationsRevisions from '../assets/icons/tools/FormationsRevisions.png';
import FormsLib from '../assets/icons/tools/FormsLib.png';
import GPNet from '../assets/icons/tools/GPNet.png';
import Intralignes from '../assets/icons/tools/Intralignes.png';
import myPeopleDoc from '../assets/icons/tools/myPeopleDoc.png';
import Outlook from '../assets/icons/tools/Outlook.png';
import Feedback from '../assets/icons/tools/Feedback.png';
import CrewLine from '../assets/icons/tools/CrewLine.png';

type ToolLink = {
  web?: string;
  mobile?: string;
  icon: string;
};

type AirFranceTool = {
  title: string;
  link: string;
  icon: string;
};

export const AIR_FRANCE_DAILY_TOOL: Record<string, ToolLink> = {
  Outlook: {
    web: 'https://outlook.office.com/mail/',
    mobile: 'ms-outlook://',
    icon: Outlook,
  },
  EasyRH: {
    web: 'https://portailadm.airfrance.fr/neocase_connexion',
    icon: EasyRH,
  },
  eRH: {
    web: 'https://eservicesrh.airfrance.fr',
    icon: eRH,
  },
  'MyPeople Doc': {
    web: 'https://www.mypeopledoc.com',
    icon: myPeopleDoc,
  },
  'Crew Mobile': {
    web: 'https://crewbidd.airfrance.fr/cm',
    mobile: 'com.airfrance.mobile.inhouse.crewmobileprd://',
    icon: CrewMobile,
  },
  Intralignes: {
    web: 'https://intralignes.airfrance.fr',
    icon: Intralignes,
  },
  'eDossier PNC': {
    web: 'https://edossierpnc.airfrance.fr/',
    icon: eDossierPNC,
  },
  'Formations / Revisions': {
    web:
      'https://intralignes.airfrance.fr/group/pnc/portail-general-formation-pnc',
    icon: FormationsRevisions,
  },
  GPNet: {
    web: 'https:gph.airfrance.fr',
    icon: GPNet,
  },
  'Crew Line': {
    mobile: 'com.airfrance.mobile.inhouse.crewline://',
    icon: CrewLine,
  },
};

const AIR_FRANCE_MISSION: Record<string, ToolLink> = {
  Cabin: {
    mobile: 'com.airfrance.mobile.inhouse.cabinprd://',
    icon: Cabin,
  },
  FormsLib: {
    mobile: 'com.airfrance.mobile.inhouse.eformsPNC://',
    icon: FormsLib,
  },
  Cloe: {
    web: 'https://ibpn.airfrance.fr/ibpnWeb/cloe',
    icon: Cloe,
  },
  'Com CCO direct': {
    web: 'https://mycomcco.airfrance.fr/',
    icon: ComCCODirect,
  },
};

const getAirFranceTool = (
  toolLinks: Record<string, ToolLink>,
  isWeb: boolean
): AirFranceTool[] => {
  const result: AirFranceTool[] = [];

  /**
   * Web only shows tools that has web link
   * Mobile shows tools that has mobile link or weblink - (mobile link has priority)
   */
  Object.keys(toolLinks).forEach((key) => {
    if (isWeb && toolLinks[key].web) {
      result.push({
        title: key,
        link: toolLinks[key].web!,
        icon: toolLinks[key].icon,
      });
    } else if (!isWeb && (toolLinks[key].mobile || toolLinks[key].web)) {
      result.push({
        title: key,
        link: toolLinks[key].mobile || toolLinks[key].web || '',
        icon: toolLinks[key].icon,
      });
    }
  });

  return result;
};

export const getAirFranceToolsAndMissions = (isWeb: boolean) => {
  const tools = getAirFranceTool(AIR_FRANCE_DAILY_TOOL, isWeb);
  const missions = getAirFranceTool(AIR_FRANCE_MISSION, isWeb);

  return {
    tools,
    missions,
  };
};
