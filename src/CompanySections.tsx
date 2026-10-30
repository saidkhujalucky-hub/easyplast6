"use client";
import {useState} from "react";
import {ArrowRight,ArrowUpRight,Check,Phone,Send,Ruler,Palette,Printer} from "lucide-react";
import {useI18n} from "./I18n";
import ProductPhoto from "./ProductPhoto";
import {products,MIN_ORDER_KG,type Product,type ProductKey} from "./catalog";

type Action=()=>void;
type Story={key:ProductKey;group:"food"|"protection"|"retail";title:string;description:string;tag:string};
const stories:Story[]=[
  {key:"cookies",group:"food",title:"Вкладыш для коробки с печеньем",description:"Плёнка располагается внутри коробки, а края загибаются поверх бортиков.",tag:"Кондитерская продукция"},
  {key:"water",group:"food",title:"Защитный пакет для бутыли 19 л",description:"Пакет надевается поверх бутыли для хранения и перевозки.",tag:"Вода и напитки"},
  {key:"carpets",group:"protection",title:"Рукав для ковра в рулоне",description:"Упаковка вокруг свёрнутого ковра. Подбирается ширина рукава в сложенном виде.",tag:"Хранение и перевозка"},
  {key:"broccoli",group:"food",title:"Перфорированная упаковка для брокколи",description:"Голубоватая прозрачная плёнка с множеством мелких отверстий. На фото — крупный план перфорации.",tag:"Овощи и свежая продукция"},
  {key:"tshirt",group:"retail",title:"Пакеты с ручками для магазинов",description:"Знакомый формат «майка» для покупок и выдачи товаров. Размер, цвет и толщина настраиваются.",tag:"Розничная торговля"},
  {key:"trash",group:"retail",title:"Большие чёрные мусорные мешки",description:"Один большой чёрный мешок для бытовых и промышленных задач. Параметры подбираются под ваш объём.",tag:"Бытовые и промышленные задачи"},
];

export function CompanyHero({onCatalog,onAbout,onCreate}:{onCatalog:Action;onAbout:Action;onCreate:Action}) {
  const {t}=useI18n();
  return <section className="corporate-hero shell">
    <div className="corporate-hero-copy"><div className="eyebrow"><span className="tiny-square"/>{t("ПРОИЗВОДСТВО ПОЛИЭТИЛЕНОВОЙ УПАКОВКИ")}</div>
      <h1>{t("Упаковка для бизнеса.")}<br/><span>{t("Сделана под вас.")}</span></h1>
      <p>{t("Для вашего продукта, размера и задачи. Производим пакеты и рукава для пищевой продукции, магазинов, хранения и перевозки.")}</p>
      <div className="corporate-hero-actions"><button className="button blue" onClick={onCatalog}>{t("Каталог продукции")}<ArrowUpRight size={18}/></button><button className="button outline" onClick={onAbout}>{t("О компании")}<ArrowRight size={17}/></button></div>
      <div className="corporate-hero-facts"><span><Check size={15}/>{t("Заказ от")} {MIN_ORDER_KG} {t("кг")}</span><span><Check size={15}/>{t("Стандартные и свои размеры")}</span></div>
      <button className="text-link corporate-custom-link" onClick={onCreate}>{t("Нужен свой формат? Настройте упаковку")}<ArrowRight size={14}/></button>
    </div>
    <div className="corporate-hero-visual"><div className="corporate-image-label"><span>easyplast.</span><span>{t("ДЛЯ ВАШЕГО ПРОДУКТА")}</span></div><div className="corporate-hero-media"><ProductPhoto kind="cookies" eager/></div><div className="corporate-image-footer"><span>{t("Вкладыш внутрь коробки")}</span><span>01 / PE</span></div><div className="corporate-inset"><ProductPhoto kind="water" eager/><span>{t("Для бутыли 19 л")}</span></div></div>
  </section>;
}

export function CompanyIntro({onAbout}:{onAbout:Action}) {
  const {t}=useI18n();
  return <section className="company-intro shell" id="company"><div><div className="eyebrow muted">{t("/ О КОМПАНИИ")}</div><h2>{t("За каждой упаковкой —")}<br/><span>{t("ваш продукт.")}</span></h2></div><div className="company-intro-copy"><p>{t("Easy Plast производит полиэтиленовую упаковку для бизнеса и повседневных задач. От вкладыша в коробку с печеньем до защитного рукава для ковра — подбираем формат под то, что вы упаковываете.")}</p><p>{t("Выберите готовые параметры или задайте свои. Размер, цвет, толщина и вес заказа остаются под вашим контролем.")}</p><div className="company-audiences"><span>{t("Для производств")}</span><span>{t("Для магазинов")}</span><span>{t("Для доставки")}</span></div><button className="text-link" onClick={onAbout}>{t("Подробнее о компании")}<ArrowUpRight size={17}/></button></div></section>;
}

function PortfolioCard({story,index,onConfigure}:{story:Story;index:number;onConfigure:(product:Product)=>void}) {
  const {t}=useI18n();
  const product=products.find(item=>item.key===story.key)!;
  return <article className="portfolio-card"><button className="portfolio-photo" onClick={()=>onConfigure(product)} aria-label={`${t("Настроить упаковку")}: ${t(story.title)}`}><ProductPhoto kind={story.key}/><span className="portfolio-image-index">{String(index+1).padStart(2,"0")}</span><span className="portfolio-photo-arrow"><ArrowUpRight size={20}/></span></button><div className="portfolio-card-copy"><span className="portfolio-category">{t(story.tag)}</span><h3>{t(story.title)}</h3><p>{t(story.description)}</p><button className="text-link" onClick={()=>onConfigure(product)}>{t("Заказать такую упаковку")}<ArrowRight size={16}/></button></div></article>;
}

export function PortfolioPreview({onPortfolio,onConfigure}:{onPortfolio:Action;onConfigure:(product:Product)=>void}) {
  const {t}=useI18n();
  return <section className="portfolio-preview shell" id="portfolio"><div className="section-top"><div><div className="eyebrow muted">{t("/ ПОРТФОЛИО УПАКОВКИ")}</div><h2>{t("Как выглядит упаковка")}<br/>{t("в работе.")}</h2></div><button className="button outline" onClick={onPortfolio}>{t("Смотреть все примеры")}<ArrowUpRight size={17}/></button></div><div className="portfolio-preview-grid">{stories.slice(0,3).map((story,index)=><PortfolioCard key={story.key} story={story} index={index} onConfigure={onConfigure}/>)}</div><p className="portfolio-caption">{t("На фотографиях — примеры применения. Цвет и размеры готового заказа согласуются отдельно.")}</p></section>;
}

export function CompanyContactBand({onContacts}:{onContacts:Action}) {
  const {t}=useI18n();
  return <section className="company-contact-band"><div><span className="eyebrow">{t("ОБСУДИМ ВАШУ ЗАДАЧУ")}</span><h2>{t("Ваш продукт.")}<br/>{t("Наша упаковка.")}</h2><p>{t("Поможем выбрать формат и согласовать параметры заказа.")}</p></div><div className="company-contact-actions"><a href="tel:+998998705300" className="company-phone"><Phone size={20}/>+998 99 870 53 00</a><a className="button blue" href="https://t.me/easyplast" target="_blank" rel="noreferrer"><Send size={18}/>{t("Написать в Telegram")}<ArrowUpRight size={17}/></a><button className="text-link" onClick={onContacts}>{t("Все контакты")}<ArrowRight size={15}/></button></div></section>;
}

export function AboutCompany({onCatalog,onCreate,onPrinting,onPortfolio,onContacts}:{onCatalog:Action;onCreate:Action;onPrinting:Action;onPortfolio:Action;onContacts:Action}) {
  const {t}=useI18n();
  return <><div className="company-page-heading"><div className="eyebrow muted">{t("/ О КОМПАНИИ")}</div><h1>{t("Easy Plast.")}<br/><span>{t("Упаковка под вашу задачу.")}</span></h1><p>{t("Производим полиэтиленовые пакеты и рукава. Помогаем подобрать формат для продукта, хранения и перевозки.")}</p></div>
    <div className="about-editorial"><div className="about-editorial-photo"><ProductPhoto kind="cookies"/><div><span>{t("Упаковка в применении")}</span><b>{t("Вкладыш для коробки с печеньем")}</b></div></div><div className="about-editorial-copy"><span className="eyebrow muted">{t("ЧЕМ МЫ ЗАНИМАЕМСЯ")}</span><h2>{t("У каждого продукта")}<br/>{t("свой формат.")}</h2><p>{t("В нашем каталоге — упаковка для 19-литровых бутылей, кондитерской продукции, овощей, ковров, магазинов и мусора. Для каждой задачи можно выбрать готовый размер или указать собственный.")}</p><p>{t("На сайте вы собираете параметры и видите стоимость упаковки. Затем менеджер уточняет детали производства, печати и доставки.")}</p><div className="company-facts"><div><b>{String(products.length).padStart(2,"0")}</b><span>{t("направлений упаковки")}</span></div><div><b>{MIN_ORDER_KG} <small>{t("кг")}</small></b><span>{t("минимальный общий заказ")}</span></div></div><button className="button blue" onClick={onCatalog}>{t("Перейти в каталог")}<ArrowUpRight size={17}/></button></div></div>
    <section className="company-options"><div className="section-top"><div><div className="eyebrow muted">{t("ПОДХОД К ЗАКАЗУ")}</div><h2>{t("Понятные параметры.")}<br/>{t("Понятный следующий шаг.")}</h2></div></div><div className="company-option-list">{[
      {Icon:Ruler,title:"Размер под ваш продукт",text:"Для пакетов указываются ширина и длина. Для ковров — только ширина рукава в сложенном виде.",action:"Создать свой размер",onClick:onCreate},
      {Icon:Palette,title:"Цвет и толщина",text:"Синий, белый, прозрачный, чёрный и другие цвета. Рекомендуемая толщина — 5 мкм; можно указать свою.",action:"Подобрать параметры",onClick:onCreate},
      {Icon:Printer,title:"Упаковка с печатью",text:"Логотип, макет, объём, стоимость и сроки печати уточняются с менеджером по телефону.",action:"Обсудить печать",onClick:onPrinting},
    ].map(({Icon,title,text,action,onClick},index)=><article key={title}><span className="company-option-number">0{index+1}</span><Icon size={23} strokeWidth={1.5}/><div><h3>{t(title)}</h3><p>{t(text)}</p></div><button className="text-link" onClick={onClick}>{t(action)}<ArrowUpRight size={16}/></button></article>)}</div></section>
    <div className="about-portfolio-link"><div><span className="eyebrow muted">{t("ПОСМОТРИТЕ ПРИМЕРЫ")}</span><h2>{t("От задачи к упаковке.")}</h2></div><button className="button outline" onClick={onPortfolio}>{t("Портфолио упаковки")}<ArrowUpRight size={18}/></button></div><CompanyContactBand onContacts={onContacts}/></>;
}

export function PackagingPortfolio({onConfigure,onContacts}:{onConfigure:(product:Product)=>void;onContacts:Action}) {
  const {t}=useI18n();
  const [filter,setFilter]=useState("all");
  const shown=stories.filter(story=>filter==="all"||story.group===filter);
  return <><div className="company-page-heading"><div className="eyebrow muted">{t("/ ПОРТФОЛИО УПАКОВКИ")}</div><h1>{t("Упаковка")}<br/><span>{t("в деле.")}</span></h1><p>{t("Примеры применения разных форматов: что упаковывают, как выглядит плёнка и какой вариант можно настроить под свою задачу.")}</p></div><div className="portfolio-filters" role="group" aria-label={t("Направления упаковки")}>{[["all","Все примеры"],["food","Пищевая упаковка"],["protection","Защита и перевозка"],["retail","Магазины и бытовые задачи"]].map(([key,label])=><button key={key} type="button" aria-pressed={filter===key} onClick={()=>setFilter(key)}>{t(label)}</button>)}</div><div className="portfolio-full-grid">{shown.map(story=><PortfolioCard key={story.key} story={story} index={stories.indexOf(story)} onConfigure={onConfigure}/>)}</div><p className="portfolio-caption">{t("На фотографиях — примеры применения. Цвет и размеры готового заказа согласуются отдельно.")}</p><CompanyContactBand onContacts={onContacts}/></>;
}
