import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import SiteNavbar from '../../components/SiteNavbar';
import Footer from '../../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solmar Development Corp | Ontario Homebuilder & Condos',
  description: 'Solmar Development Corp is a family-owned GTA homebuilder based in Vaughan, building condos, townhomes and detached homes across Ontario. Explore active communities and projects on Findle.',
};

export default async function SolmarDevelopmentPage() {
  // 1. Fetch all listings from both Supabase tables
  const [projectsRes, c21Res] = await Promise.all([
    supabase.from('projects').select('*'),
    supabase.from('c21_portal_listings').select('*'),
  ]);

  const allListings = [
    ...(projectsRes.data || []).map((item: any) => ({ ...item, is_c21: false })),
    ...(c21Res.data || []).map((item: any) => ({
      ...item,
      id: `c21-${item.id}`,
      is_c21: true,
    })),
  ];

  // 2. Filter properties specifically for Solmar Development using clean normalization
  const cleanString = (str: string) => 
    str.toLowerCase().replace(/-(corp|development|inc|ltd|corporation)|(corp|development|inc|ltd|corporation)/g, '').replace(/[^a-z0-9]/g, '');

  const targetSlug = cleanString('solmar development');

  const developerProperties = allListings.filter((item) => {
    if (!item.developer) return false;
    const itemDev = cleanString(item.developer);
    return itemDev.includes('solmar') || targetSlug.includes(itemDev);
  });

  const totalProjects = developerProperties.length;
  const activeCities = Array.from(new Set(developerProperties.map((p) => p.city))).filter(Boolean);

  return (
    <main className="min-h-screen bg-[#030305] text-slate-100 selection:bg-indigo-500 selection:text-white antialiased relative overflow-x-hidden font-mono">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent pointer-events-none z-0" />
      
      <SiteNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Developer Profile Header Card */}
        <section className="mb-16 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-7 lg:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-3 text-[9px] uppercase tracking-[0.22em] text-indigo-400">
                Verified Developer Profile // Founded Mid-1980s // Family-Owned
              </div>

              <h1 className="text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
                Solmar Development Corp
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 font-sans">
                Solmar Development Corp is a privately held, family-owned residential real estate developer and homebuilder headquartered in Concord (Vaughan), Ontario. Founded by Benny Marotta and operating for over 36 years, Solmar builds detached and semi-detached homes, townhomes and high-rise condominiums across the Greater Toronto Area and Southern Ontario.
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950 flex items-center justify-center p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://solmar.ca/wp-content/uploads/2023/02/SOLMAR-CORP-LOGO_NEW-NO-TAGLINE-1.png"
                  alt="Solmar Development Corp logo"
                  className="h-[120px] w-full object-contain object-center rounded-lg bg-slate-950 p-2"
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-slate-500">Featured Projects</span>
                  <span className="mt-1 block text-xl font-bold text-emerald-400">{totalProjects > 0 ? totalProjects : 10}</span>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-slate-500">Active Markets</span>
                  <span className="mt-1 block text-xl font-bold text-indigo-400">{activeCities.length > 0 ? activeCities.length : 9}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Overview Content Section */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 border border-slate-800 bg-slate-900/20 p-6 sm:p-8 rounded-2xl">
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
              Developer Snapshot
            </h2>
            <ul className="space-y-3 text-sm text-slate-300 font-sans">
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Developer:</strong> Solmar Development Corp</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Founder & CEO:</strong> Benny Marotta</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Founded:</strong> Mid-1980s (36+ years)</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Headquarters:</strong> Concord (Vaughan), Ontario</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Ownership:</strong> Privately, family-owned &amp; operated</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Property Types:</strong> Condos, Townhomes, Semi-Detached, Detached, Commercial, Industrial</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
              Portfolio Highlights
            </h2>
            <div className="space-y-4 text-sm text-slate-300 font-sans">
              <div>
                <strong className="text-white font-mono text-xs uppercase block text-indigo-400">Geographic Reach</strong>
                <p className="text-xs mt-1">Active across Greater Toronto Area and Southern Ontario including Vaughan, Mississauga, Brampton, Caledon, Bolton, Erin, East Gwillimbury, Bradford, and Niagara-on-the-Lake.</p>
              </div>
              <div>
                <strong className="text-white font-mono text-xs uppercase block text-indigo-400">Project Diversity</strong>
                <p className="text-xs mt-1">Mix of high-rise condominium towers (Edge Towers, Bristol Place, ORO) and master-planned low-rise freehold communities (Erin Glen, Wildfield Village).</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16 border border-slate-800 bg-slate-900/20 p-6 sm:p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
            About Solmar Development Corp
          </h2>
          <div className="space-y-4 text-sm text-slate-300 font-sans">
            <p>
              Solmar Development Corp is a Vaughan-based homebuilder founded and led by Benny Marotta, an Italian-Canadian developer who emigrated from Naples and settled in Vaughan. The company is family-owned and operated, with Marotta's daughter Angela Marotta serving as Director of Sales &amp; Marketing, reflecting the multi-generational family structure of the business. According to Real Estate News Exchange (RENX), Marotta formed Solmar in the mid-1980s, and the company describes itself in 2026 as having over 36 years of homebuilding experience.
            </p>
            <p>
              Solmar's development focus is broad: it produces both master-planned low-rise communities of detached, semi-detached and freehold townhomes, and high-rise condominium towers. Beyond housing, Solmar has also delivered commercial and industrial projects. Within Ontario's builder landscape, Solmar positions itself as a luxury-oriented, design-led developer willing to pursue high-density projects. Notably, its Bellaria Residences in Vaughan required a three-year, $2-million legal battle with the City of Vaughan that was ultimately decided in Solmar's favour at the Ontario Municipal Board, resulting in 16-storey towers.
            </p>
            <p>
              Solmar is licensed with Ontario's Home Construction Regulatory Authority (HCRA) and all new homes carry Tarion warranty coverage. The company is also a BILD member (Building Industry and Land Development Association), recognized as a "Trusted Builder." In a signal of its scale as a landholder, Solmar sold roughly 194 acres of Caledon industrial land to Prologis for $479.62 million in a deal that closed on June 9, 2022.
            </p>
          </div>
        </section>

        {/* Geographic Footprint Section */}
        <section className="mb-16 border border-slate-800 bg-slate-900/20 p-6 sm:p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
            Geographic Footprint
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans">
            <div>
              <h3 className="font-bold text-indigo-400 font-mono text-xs uppercase mb-2">York &amp; Peel Regions</h3>
              <p className="text-slate-300">Headquarters in Vaughan with high-rise condos (Bellaria, Park Avenue Place) and active/upcoming projects. Mississauga City Centre focus with Edge Towers series and upcoming ORO. Brampton flagship Bristol Place and commercial/industrial developments.</p>
            </div>
            <div>
              <h3 className="font-bold text-indigo-400 font-mono text-xs uppercase mb-2">Caledon &amp; Bolton</h3>
              <p className="text-slate-300">Newest low-rise family-oriented communities including Wildfield Village (Caledon), Humber Station (Caledon), and Mount Hope (Bolton). Major landholder in region prior to Prologis sale.</p>
            </div>
            <div>
              <h3 className="font-bold text-indigo-400 font-mono text-xs uppercase mb-2">Secondary Markets</h3>
              <p className="text-slate-300">Erin Glen freehold community in Wellington County; Sharon mid-rise in East Gwillimbury; Parkview Heights in Bradford; completed luxury communities in Niagara-on-the-Lake.</p>
            </div>
            <div>
              <h3 className="font-bold text-indigo-400 font-mono text-xs uppercase mb-2">Development Strategy</h3>
              <p className="text-slate-300">Balanced portfolio of high-density condos in major centres (Mississauga, Brampton) and family-oriented freehold communities in growth corridors (Caledon, Erin, Bolton).</p>
            </div>
          </div>
        </section>

        {/* Property Grid Section */}
        <section>
          <div className="text-xs tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
            <span>ACTIVE & FEATURED COMMUNITIES ({totalProjects > 0 ? totalProjects : 10})</span>
            <span className="text-slate-500">ONTARIO PORTFOLIO</span>
          </div>

          {developerProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {developerProperties.map((property) => (
                <Link 
                  key={property.id} 
                  href={`/directory/${property.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/40 hover:border-indigo-500/50 hover:bg-slate-900/60 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-500 cursor-pointer"
                >
                  <div className="aspect-[16/10] w-full bg-slate-950 relative overflow-hidden border-b border-slate-700/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={property.image_url || "/fallback-estate.jpg"}
                      alt={property.title}
                      className="h-full w-full object-cover object-center transition-all duration-700 opacity-85 group-hover:scale-110 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-lg px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold bg-black/80 border backdrop-blur-sm border-emerald-500/50 text-emerald-300">
                        ● {property.selling_status || 'Active Project'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors uppercase line-clamp-1">
                        {property.title}
                      </h3>
                      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-700/40 pt-4 text-xs">
                        <div>
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">CITY</span>
                          <span className="font-medium text-slate-300 uppercase mt-1 block tracking-wider truncate">{property.city || 'Ontario'}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">PROPERTY TYPE</span>
                          <span className="font-medium text-slate-300 mt-1 block tracking-wider truncate">{property.sqft_text || 'See Details'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-700/40 flex items-center justify-between">
                      <div>
                        <span className="block text-[8px] text-slate-500 uppercase tracking-widest">STARTING FROM</span>
                        <span className="text-xl font-black text-white tracking-tight">
                          {property.price_text || 'Contact for Pricing'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Static Fallback Card Showcase if database query is empty during initial setup */}
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Project</span>
                <h3 className="text-lg font-bold text-white mt-2">Erin Glen</h3>
                <p className="text-xs text-slate-400 mt-1">Erin, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Freehold Towns, Semis &amp; Detached</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Under Construction</span>
                <h3 className="text-lg font-bold text-white mt-2">ORO at Edge Towers</h3>
                <p className="text-xs text-slate-400 mt-1">Mississauga, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">50-Storey High-Rise Condo (614 Units)</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-indigo-400 font-bold uppercase">● Coming Soon</span>
                <h3 className="text-lg font-bold text-white mt-2">Wildfield Village</h3>
                <p className="text-xs text-slate-400 mt-1">Caledon, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Master-Planned Low-Rise Community</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-indigo-400 font-bold uppercase">● Coming Soon</span>
                <h3 className="text-lg font-bold text-white mt-2">Bristol Place</h3>
                <p className="text-xs text-slate-400 mt-1">Brampton, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Two 48-Storey Towers (1,124 Units)</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-indigo-400 font-bold uppercase">● Coming Soon</span>
                <h3 className="text-lg font-bold text-white mt-2">Sharon</h3>
                <p className="text-xs text-slate-400 mt-1">East Gwillimbury, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Mid-Rise Community</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-slate-500 font-bold uppercase">● Completed</span>
                <h3 className="text-lg font-bold text-white mt-2">Edge Towers 1 &amp; 2</h3>
                <p className="text-xs text-slate-400 mt-1">Mississauga, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">High-Rise Condominiums</div>
              </div>
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <section className="mt-20 border-t border-slate-800 pt-12">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans">
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Who is Solmar Development Corp?</h3>
              <p className="text-slate-300">Solmar Development Corp is a family-owned residential real estate developer and homebuilder based in Concord (Vaughan), Ontario, founded and led by Benny Marotta. It builds condominiums, townhomes, semi-detached and detached homes across the Greater Toronto Area.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Where is Solmar located?</h3>
              <p className="text-slate-300">Solmar Development Corp's head office is at 122 Romina Drive, Concord (Vaughan), Ontario, a suburb northwest of Toronto in York Region.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Who founded Solmar Development Corp?</h3>
              <p className="text-slate-300">Solmar was founded by Benny Marotta, who serves as its President and CEO. RENX reports Marotta formed the company in the mid-1980s, and it remains privately family-owned and operated for over 36 years.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Where does Solmar build in Ontario?</h3>
              <p className="text-slate-300">Solmar builds across the Greater Toronto Area and Southern Ontario, including Vaughan, Mississauga, Brampton, Caledon, Bolton, Erin, East Gwillimbury, Bradford and Niagara-on-the-Lake.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">What types of homes does Solmar build?</h3>
              <p className="text-slate-300">Solmar builds detached homes, semi-detached homes, townhomes and high-rise condominiums. The portfolio ranges from master-planned low-rise communities to luxury condominium towers.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Is Solmar licensed in Ontario?</h3>
              <p className="text-slate-300">Yes. Solmar is licensed with Ontario's Home Construction Regulatory Authority (HCRA) and all new homes are covered by Tarion warranty. Buyers can verify Solmar's status in the HCRA Ontario Builder Directory.</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
