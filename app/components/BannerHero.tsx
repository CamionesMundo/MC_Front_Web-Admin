import Link from "next/link";
import React from "react";

function BannerHero({ htmlId, page, description = null }: { htmlId: string; page: string; description: any }) {
  const isTermpage = htmlId === 'terms'
  
  return (
    <section id={htmlId} style={{paddingTop:isTermpage ? '70px': '0px'}}>
      <div className="h-96 bg-[url('/images/banner-hero-bg.png')] bg-cover bg-[50%] bg-no-repeat relative flex items-center py-8 px-8 lg:px-28">
        <div className="absolute inset-0 bg-white/90" />
        <div className="z-10 space-y-2">
          <div>
            <h1 className="font-bold text-4xl">{page}</h1>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>{page}</span>
          </div>
          {description && (<div className="flex items-center gap-1">
            <p>{description}</p>
          </div>)}
        </div>
      </div>
    </section>
  );
}

export default BannerHero;
