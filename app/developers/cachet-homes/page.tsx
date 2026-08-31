import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import SiteNavbar from '../../components/SiteNavbar';
import Footer from '../../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cachet Homes Ontario | Southern Ontario Builder Profile',
  description: 'Cachet Homes is a Southern Ontario homebuilder since 1981. Explore active communities in Hamilton, Brantford, Stratford, Woodstock, Erin and more on Findle.',
};

export default async function CachetHomesPage() {
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

  // 2. Filter properties specifically for Cachet Homes using clean normalization
  const cleanString = (str: string) => 
    str.toLowerCase().replace(/-(homes|developments|inc|ltd|corporation|estate)|(homes|developments|inc|ltd|corporation|estate)/g, '').replace(/[^a-z0-9]/g, '');

  const targetSlug = cleanString('cachet homes');

  const developerProperties = allListings.filter((item) => {
    if (!item.developer) return false;
    const itemDev = cleanString(item.developer);
    return itemDev.includes('cachet') || targetSlug.includes(itemDev);
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
                Verified Developer Profile // Founded 1981 // Southern Ontario Builder
              </div>

              <h1 className="text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
                Cachet Homes
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 font-sans">
                Cachet Homes is a Southern Ontario residential developer and homebuilder founded in 1981 by Anthony Auciello. Formerly known as Cachet Estate Homes, the company specializes in detached homes and freehold townhomes in master-planned communities across the Greater Golden Horseshoe and Southwestern Ontario. With over 40 years of experience, Cachet has established itself as a value-focused builder serving family-oriented markets.
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950 flex items-center justify-center p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://www.cachethomes.com/wp-content/uploads/2023/07/Cachet-Logo-1-1.png"
                  alt="Cachet Homes logo"
                  className="h-[120px] w-full object-contain object-center rounded-lg bg-slate-950 p-2"
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-slate-500">Featured Communities</span>
                  <span className="mt-1 block text-xl font-bold text-emerald-400">{totalProjects > 0 ? totalProjects : 6}</span>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-slate-500">Active Markets</span>
                  <span className="mt-1 block text-xl font-bold text-indigo-400">{activeCities.length > 0 ? activeCities.length : 8}</span>
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
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Developer:</strong> Cachet Homes (formerly Cachet Estate Homes)</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Founded:</strong> 1981 by Anthony Auciello</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Headquarters:</strong> Mississauga, Ontario</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Current President:</strong> Ramsey Shaheen (since 2022)</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Sister Company:</strong> Cachet Developments (est. 2008)</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Property Types:</strong> Detached Homes, Freehold Townhomes, Semi-Linked Towns</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
              Market Focus & Scale
            </h2>
            <div className="space-y-4 text-sm text-slate-300 font-sans">
              <div>
                <strong className="text-white font-mono text-xs uppercase block text-indigo-400">Southern Ontario Footprint</strong>
                <p className="text-xs mt-1">Active in Hamilton, Brantford, Stratford, Woodstock, Erin, Cambridge and Kitchener; expanding into secondary markets.</p>
              </div>
              <div>
                <strong className="text-white font-mono text-xs uppercase block text-indigo-400">Production & Recognition</strong>
                <p className="text-xs mt-1">~700 homes closed in 2024. 2024 BILD Award winner for Best Project Branding & Identity. Historically GTHBA Pinnacle Award winner (2005).</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16 border border-slate-800 bg-slate-900/20 p-6 sm:p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
            About Cachet Homes
          </h2>
          <div className="space-y-4 text-sm text-slate-300 font-sans">
            <p>
              Cachet Homes is a family-founded, fully integrated homebuilding and land-development company operating across Southern Ontario. Founded in 1981 by Anthony Auciello, the company began as a custom-estate builder in the Unionville area of Markham, initially operating as A. Auciello and Son Custom Homes, before adopting the Cachet Estate Homes name in 1985 while building luxury custom homes in Markham's Cachet Country Club area.
            </p>
            <p>
              The company transitioned from custom estates to turn-key community development in 1994 and launched its first master-planned community, Olde Winchester, in 2001. Leadership passed from founder Anthony Auciello to his son Desi Auciello in 2004, and to current President Ramsey Shaheen in 2022. In 2008, Cachet created its sister company, Cachet Developments, to handle dedicated land development and planning.
            </p>
            <p>
              Cachet rebranded from Cachet Estate Homes to Cachet Homes in 2020 and celebrated selling its 4,000th home that same year. In 2023, the company relocated its headquarters to Mississauga. Today, Cachet focuses on low-rise, family-oriented housing in master-planned communities across Southern Ontario, positioning itself on affordability and value in growing secondary markets. The company reported closing close to 700 homes in 2024 and described itself as the second-largest low-rise residential builder in Ontario.
            </p>
          </div>
        </section>

        {/* Market Presence Overview */}
        <section className="mb-16 border border-slate-800 bg-slate-900/20 p-6 sm:p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
            Southern Ontario Market Presence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans">
            <div>
              <h3 className="font-bold text-indigo-400 font-mono text-xs uppercase mb-2">Greater Golden Horseshoe</h3>
              <p className="text-slate-300">Two active communities in Hamilton (Cachet Binbrook and Mount Hope by Cachet), plus historic presence in Markham, Vaughan, and Brampton with award-winning master-planned communities.</p>
            </div>
            <div>
              <h3 className="font-bold text-indigo-400 font-mono text-xs uppercase mb-2">Southwestern Ontario</h3>
              <p className="text-slate-300">Core expansion markets in Brantford (Havendale), Stratford (Avon Park), Woodstock (Heartwood), and Erin (Erin Glen), representing Cachet's primary value-oriented footprint.</p>
            </div>
            <div>
              <h3 className="font-bold text-indigo-400 font-mono text-xs uppercase mb-2">Growth Corridors</h3>
              <p className="text-slate-300">Upcoming projects in Kitchener (The Enclave) and Elora (Everstone), plus completed communities in Cambridge, Arthur, and historic markets.</p>
            </div>
            <div>
              <h3 className="font-bold text-indigo-400 font-mono text-xs uppercase mb-2">Market Strategy</h3>
              <p className="text-slate-300">Emphasis on family-centric, affordable detached homes and townhomes in secondary Ontario markets rather than GTA core, with low-rise community planning as core competency.</p>
            </div>
          </div>
        </section>

        {/* Property Grid Section */}
        <section>
          <div className="text-xs tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
            <span>ACTIVE & FEATURED COMMUNITIES ({totalProjects > 0 ? totalProjects : 6})</span>
            <span className="text-slate-500">SOUTHERN ONTARIO PORTFOLIO</span>
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
                        ● {property.selling_status || 'Active Community'}
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
                          <span className="font-medium text-slate-300 mt-1 block tracking-wider truncate">{property.sqft_text || 'See Specs'}</span>
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
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">Cachet Binbrook</h3>
                <p className="text-xs text-slate-400 mt-1">Hamilton, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Freehold Townhomes & Detached Homes</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">Havendale by Cachet</h3>
                <p className="text-xs text-slate-400 mt-1">Brantford, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Freehold Townhomes & Detached Homes</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">Avon Park by Cachet</h3>
                <p className="text-xs text-slate-400 mt-1">Stratford, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Townhomes & Detached Homes</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">Heartwood by Cachet</h3>
                <p className="text-xs text-slate-400 mt-1">Woodstock, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Townhomes & Detached Homes</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">Erin Glen</h3>
                <p className="text-xs text-slate-400 mt-1">Erin, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Detached Homes (33.5' & 36' Lots)</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">Mount Hope by Cachet</h3>
                <p className="text-xs text-slate-400 mt-1">Hamilton, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Townhomes (Move-In Ready)</div>
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
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Who owns Cachet Homes?</h3>
              <p className="text-slate-300">Cachet Homes is a family-founded company started in 1981 by Anthony Auciello. Leadership passed to his son Desi Auciello and, since 2022, to President Ramsey Shaheen.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Is Cachet Homes the same as Cachet Estate Homes?</h3>
              <p className="text-slate-300">Yes. The company rebranded from Cachet Estate Homes to Cachet Homes in 2020. Cachet Developments is its land-development sister company (established 2008).</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Where is Cachet Homes based?</h3>
              <p className="text-slate-300">Its head office is at 2555 Meadowpine Blvd, Unit 3, Mississauga, Ontario, following a 2023 relocation from its previous locations.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Where does Cachet Homes build?</h3>
              <p className="text-slate-300">Across Southern Ontario, currently in Hamilton, Brantford, Stratford, Woodstock and Erin, with upcoming communities in Kitchener and Elora.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">What types of homes does Cachet build?</h3>
              <p className="text-slate-300">Primarily detached homes and freehold townhomes, plus semi-linked and executive townhomes, in low-rise master-planned communities positioned for family living.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Are Cachet homes covered by warranty?</h3>
              <p className="text-slate-300">Yes. Cachet's new homes are covered under Ontario's Tarion New Home Warranty with 30-day, 1-year, 2-year and 7-year major structural coverage options.</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
