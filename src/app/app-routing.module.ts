import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
    path: '',
    loadChildren: () => import('./country/country.module').then( m => m.CountryPageModule)
  },
  {
    path: 'ngopartner',
    loadChildren: () => import('./ngopartner/ngopartner.module').then( m => m.NgopartnerPageModule)
  },
  {
    path: 'viewdata',
    loadChildren: () => import('./viewdata/viewdata.module').then( m => m.ViewdataPageModule)
  },
 
{ 
    path: '', 
    loadChildren: './tabs/tabs.module#TabsPageModule'
},
  {
    path: 'onboardingone',
    loadChildren: () => import('./onboardingone/onboardingone.module').then( m => m.OnboardingonePageModule)
  },
  {
    path: 'nointernet',
    loadChildren: () => import('./nointernet/nointernet.module').then( m => m.NointernetPageModule)
  },
  {
    path: 'onboardingtwo',
    loadChildren: () => import('./onboardingtwo/onboardingtwo.module').then( m => m.OnboardingtwoPageModule)
  },
  {
    path: 'onboardingthree',
    loadChildren: () => import('./onboardingthree/onboardingthree.module').then( m => m.OnboardingthreePageModule)
  },
  {
    path: 'onboardingfour',
    loadChildren: () => import('./onboardingfour/onboardingfour.module').then( m => m.OnboardingfourPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'languageselection',
    loadChildren: () => import('./languageselection/languageselection.module').then( m => m.LanguageselectionPageModule)
  },
  {
    path: 'onboardingtwono',
    loadChildren: () => import('./onboardingtwono/onboardingtwono.module').then( m => m.OnboardingtwonoPageModule)
  },
  
  {
    path: 'preframing',
    loadChildren: () => import('./preframing/preframing.module').then( m => m.PreframingPageModule)
  },
  {
    path: 'preframingtwo',
    loadChildren: () => import('./preframingtwo/preframingtwo.module').then( m => m.PreframingtwoPageModule)
  },
  {
    path: 'reportfiledone',
    loadChildren: () => import('./reportfiledone/reportfiledone.module').then( m => m.ReportfiledonePageModule)
  },
  {
    path: 'reportfiledtwo',
    loadChildren: () => import('./reportfiledtwo/reportfiledtwo.module').then( m => m.ReportfiledtwoPageModule)
  },
  {
    path: 'reportfiledthree',
    loadChildren: () => import('./reportfiledthree/reportfiledthree.module').then( m => m.ReportfiledthreePageModule)
  },
  {
    path: 'reportfiledfour',
    loadChildren: () => import('./reportfiledfour/reportfiledfour.module').then( m => m.ReportfiledfourPageModule)
  },
  {
    path: 'reportfiledfive',
    loadChildren: () => import('./reportfiledfive/reportfiledfive.module').then( m => m.ReportfiledfivePageModule)
  },
  {
    path: 'reportfiledsix',
    loadChildren: () => import('./reportfiledsix/reportfiledsix.module').then( m => m.ReportfiledsixPageModule)
  },
  {
    path: 'reportfiledseven',
    loadChildren: () => import('./reportfiledseven/reportfiledseven.module').then( m => m.ReportfiledsevenPageModule)
  },
  {
    path: 'reportfiledeight',
    loadChildren: () => import('./reportfiledeight/reportfiledeight.module').then( m => m.ReportfiledeightPageModule)
  },
  {
    path: 'reportfilednine',
    loadChildren: () => import('./reportfilednine/reportfilednine.module').then( m => m.ReportfiledninePageModule)
  },
  {
    path: 'reportfiledten',
    loadChildren: () => import('./reportfiledten/reportfiledten.module').then( m => m.ReportfiledtenPageModule)
  },
  {
    path: 'reportfiledeleven',
    loadChildren: () => import('./reportfiledeleven/reportfiledeleven.module').then( m => m.ReportfiledelevenPageModule)
  },
  {
    path: 'reportfiledtwelve',
    loadChildren: () => import('./reportfiledtwelve/reportfiledtwelve.module').then( m => m.ReportfiledtwelvePageModule)
  },
  {
    path: 'preframingsecondary',
    loadChildren: () => import('./preframingsecondary/preframingsecondary.module').then( m => m.PreframingsecondaryPageModule)
  },
  {
    path: 'domesticviolence',
    loadChildren: () => import('./domesticviolence/domesticviolence.module').then( m => m.DomesticviolencePageModule)
  },
  {
    path: 'safteytipone',
    loadChildren: () => import('./safteytipone/safteytipone.module').then( m => m.SafteytiponePageModule)
  },
  {
    path: 'safteytiptwo',
    loadChildren: () => import('./safteytiptwo/safteytiptwo.module').then( m => m.SafteytiptwoPageModule)
  },
  {
    path: 'safteytipthree',
    loadChildren: () => import('./safteytipthree/safteytipthree.module').then( m => m.SafteytipthreePageModule)
  },
  {
    path: 'safteytipfour',
    loadChildren: () => import('./safteytipfour/safteytipfour.module').then( m => m.SafteytipfourPageModule)
  },
  {
    path: 'safteytip-thankyou',
    loadChildren: () => import('./safteytip-thankyou/safteytip-thankyou.module').then( m => m.SafteytipThankyouPageModule)
  },
  {
    path: 'viewsafety',
    loadChildren: () => import('./viewsafety/viewsafety.module').then( m => m.ViewsafetyPageModule)
  },
  {
    path: 'viewsafteydetail',
    loadChildren: () => import('./viewsafteydetail/viewsafteydetail.module').then( m => m.ViewsafteydetailPageModule)
  },
  {
    path: 'viewsafteydetail',
    loadChildren: () => import('./viewsafteydetail/viewsafteydetail.module').then( m => m.ViewsafteydetailPageModule)
  },
  {
    path: 'viewreport',
    loadChildren: () => import('./viewreport/viewreport.module').then( m => m.ViewreportPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
    
  {
    path: 'helplines',
    loadChildren: () => import('./helplines/helplines.module').then( m => m.HelplinesPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'form-one',
    loadChildren: () => import('./SecondaryForm/form-one/form-one.module').then( m => m.FormOnePageModule)
  },
  {
    path: 'form-two',
    loadChildren: () => import('./SecondaryForm/form-two/form-two.module').then( m => m.FormTwoPageModule)
  },
  {
    path: 'sevensubfieldone',
    loadChildren: () => import('./sevensubfieldone/sevensubfieldone.module').then( m => m.SevensubfieldonePageModule)
  },
  {
    path: 'sevensubfieldtwo',
    loadChildren: () => import('./sevensubfieldtwo/sevensubfieldtwo.module').then( m => m.SevensubfieldtwoPageModule)
  },
  {
    path: 'sevensubfieldthree',
    loadChildren: () => import('./sevensubfieldthree/sevensubfieldthree.module').then( m => m.SevensubfieldthreePageModule)
  },
  {
    path: 'safetyfilter',
    loadChildren: () => import('./safetyfilter/safetyfilter.module').then( m => m.SafetyfilterPageModule)
  },
  {
    path: 'viewreportdetail',
    loadChildren: () => import('./viewreportdetail/viewreportdetail.module').then( m => m.ViewreportdetailPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'volunteer',
    loadChildren: () => import('./volunteer/volunteer.module').then( m => m.VolunteerPageModule)
  },
  {
    path: 'donate',
    loadChildren: () => import('./donate/donate.module').then( m => m.DonatePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'privacypolicy',
    loadChildren: () => import('./privacypolicy/privacypolicy.module').then( m => m.PrivacypolicyPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
    {
    path: 'myviewreport',
    loadChildren: () => import('./myviewreport/myviewreport.module').then( m => m.MyviewreportPageModule)
  },
  {
    path: 'myreport',
    loadChildren: () => import('./myreport/myreport.module').then( m => m.MyreportPageModule)
  },
  {
    path: 'editreport',
    loadChildren: () => import('./editreport/editreport.module').then( m => m.EditreportPageModule)
  },
  {
    path: 'hospital',
    loadChildren: () => import('./hospital/hospital.module').then( m => m.HospitalPageModule)
  },
  {
    path: 'findhospital',
    loadChildren: () => import('./findhospital/findhospital.module').then( m => m.FindhospitalPageModule)
  },
  {
    path: 'hospitallisting',
    loadChildren: () => import('./hospitallisting/hospitallisting.module').then( m => m.HospitallistingPageModule)
  },
  {
    path: 'police',
    loadChildren: () => import('./police/police.module').then( m => m.PolicePageModule)
  },
  {
    path: 'findpolice',
    loadChildren: () => import('./findpolice/findpolice.module').then( m => m.FindpolicePageModule)
  },
  {
    path: 'policelisting',
    loadChildren: () => import('./policelisting/policelisting.module').then( m => m.PolicelistingPageModule)
  },
  {
    path: 'legalresources',
    loadChildren: () => import('./legalresources/legalresources.module').then( m => m.LegalresourcesPageModule)
  },
  {
    path: 'ipc',
    loadChildren: () => import('./ipc/ipc.module').then( m => m.IpcPageModule)
  },
  {
    path: 'onlineipc',
    loadChildren: () => import('./onlineipc/onlineipc.module').then( m => m.OnlineipcPageModule)
  },
  {
    path: 'sexualassaultipc',
    loadChildren: () => import('./sexualassaultipc/sexualassaultipc.module').then( m => m.SexualassaultipcPageModule)
  },
  {
    path: 'oglingipc',
    loadChildren: () => import('./oglingipc/oglingipc.module').then( m => m.OglingipcPageModule)
  },
  {
    path: 'takingphotoipc',
    loadChildren: () => import('./takingphotoipc/takingphotoipc.module').then( m => m.TakingphotoipcPageModule)
  },
  {
    path: 'commentingipc',
    loadChildren: () => import('./commentingipc/commentingipc.module').then( m => m.CommentingipcPageModule)
  },
  {
    path: 'indecentipc',
    loadChildren: () => import('./indecentipc/indecentipc.module').then( m => m.IndecentipcPageModule)
  },
  {
    path: 'touchingipc',
    loadChildren: () => import('./touchingipc/touchingipc.module').then( m => m.TouchingipcPageModule)
  },
  {
    path: 'sexualinvitesipc',
    loadChildren: () => import('./sexualinvitesipc/sexualinvitesipc.module').then( m => m.SexualinvitesipcPageModule)
  },
  {
    path: 'chainsnachtingipc',
    loadChildren: () => import('./chainsnachtingipc/chainsnachtingipc.module').then( m => m.ChainsnachtingipcPageModule)
  },
  {
    path: 'humanipc',
    loadChildren: () => import('./humanipc/humanipc.module').then( m => m.HumanipcPageModule)
  },
  {
    path: 'catcallsipc',
    loadChildren: () => import('./catcallsipc/catcallsipc.module').then( m => m.CatcallsipcPageModule)
  },
  {
    path: 'stakingipc',
    loadChildren: () => import('./stakingipc/stakingipc.module').then( m => m.StakingipcPageModule)
  },
  {
    path: 'mysafety',
    loadChildren: () => import('./mysafety/mysafety.module').then( m => m.MysafetyPageModule)
  },
  {
    path: 'mysafetyreport',
    loadChildren: () => import('./mysafetyreport/mysafetyreport.module').then( m => m.MysafetyreportPageModule)
  },
  {
    path: 'editsafetytip',
    loadChildren: () => import('./editsafetytip/editsafetytip.module').then( m => m.EditsafetytipPageModule)
  },
  {
    path: 'aboutsafecity',
    loadChildren: () => import('./aboutsafecity/aboutsafecity.module').then( m => m.AboutsafecityPageModule)
  },
  {
    path: 'filing-fir',
    loadChildren: () => import('./filing-fir/filing-fir.module').then( m => m.FilingFIRPageModule)
  },
  {
    path: 'countrymenu',
    loadChildren: () => import('./countrymenu/countrymenu.module').then( m => m.CountrymenuPageModule)
  },
  {
    path: 'languagemenu',
    loadChildren: () => import('./languagemenu/languagemenu.module').then( m => m.LanguagemenuPageModule)
  },
  {
    path: 'organization',
    loadChildren: () => import('./organization/organization.module').then( m => m.OrganizationPageModule)
  },
  {
    path: 'verfication',
    loadChildren: () => import('./verfication/verfication.module').then( m => m.VerficationPageModule)
  },
  {
    path: 'modelreport',
    loadChildren: () => import('./modelreport/modelreport.module').then( m => m.ModelreportPageModule)
  },
  
   {
    path: 'primaryform',
    loadChildren: () => import('./primaryform/primaryform.module').then( m => m.PrimaryformPageModule)
  },
  {
    path: 'incidentfilter',
    loadChildren: () => import('./incidentfilter/incidentfilter.module').then( m => m.IncidentfilterPageModule)
  },
  
  {
    path: 'organizationmenu',
    loadChildren: () => import('./organizationmenu/organizationmenu.module').then( m => m.OrganizationmenuPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'detailpopup',
    loadChildren: () => import('./detailpopup/detailpopup.module').then( m => m.DetailpopupPageModule)
  },
  {
    path: 'wellness',
    loadChildren: () => import('./wellness/wellness.module').then( m => m.WellnessPageModule)
  },
  {
    path: 'countrymenupopover',
    loadChildren: () => import('./countrymenupopover/countrymenupopover.module').then( m => m.CountrymenupopoverPageModule)
  },
  {
    path: 'countrymenupopover',
    loadChildren: () => import('./countrymenupopover/countrymenupopover.module').then( m => m.CountrymenupopoverPageModule)
  },
  {
    path: 'viewdata',
    loadChildren: () => import('./viewdata/viewdata.module').then( m => m.ViewdataPageModule)
  },
  {
    path: 'socialpop',
    loadChildren: () => import('./socialpop/socialpop.module').then( m => m.SocialpopPageModule)
  },
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
