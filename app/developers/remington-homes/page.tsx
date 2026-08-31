import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import SiteNavbar from '../../components/SiteNavbar';
import Footer from '../../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Remington Homes Ontario | Developer Profile & Communities',
  description: 'Remington Homes is the low-rise homebuilding division of The Remington Group. Explore its Ontario communities and projects in Markham, Vaughan, King City, Brampton, Oakville and Barrie on Findle.',
};

export default async function RemingtonHomesPage() {
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

  // 2. Filter properties specifically for Remington Homes using clean normalization
  const cleanString = (str: string) => 
    str.toLowerCase().replace(/-(homes|developments|inc|ltd|corporation|group)|(homes|developments|inc|ltd|corporation|group)/g, '').replace(/[^a-z0-9]/g, '');

  const targetSlug = cleanString('remington homes');

  const developerProperties = allListings.filter((item) => {
    if (!item.developer) return false;
    const itemDev = cleanString(item.developer);
    return itemDev.includes('remington') || targetSlug.includes(itemDev);
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
                Verified Developer Profile // Founded 1990 (approx.) // The Remington Group Inc.
              </div>

              <h1 className="text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
                Remington Homes
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 font-sans">
                Remington Homes is the low-rise homebuilding division of The Remington Group Inc., a privately held real estate developer headquartered in Vaughan, Ontario. Specializing in townhomes, detached homes, bungalows, and estate homes, Remington has built a legacy of quality craftsmanship across the Greater Toronto Area and beyond with more than 75 years of combined development experience.
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950 flex items-center justify-center p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://remingtongroupinc.com/wp-content/uploads/2023/11/remington-logo.png"
                  alt="Remington Homes logo"
                  className="h-[120px] w-full object-contain object-center rounded-lg bg-slate-950 p-2"
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-slate-500">Featured Developments</span>
                  <span className="mt-1 block text-xl font-bold text-emerald-400">{totalProjects > 0 ? totalProjects : 8}</span>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-slate-500">Active Markets</span>
                  <span className="mt-1 block text-xl font-bold text-indigo-400">{activeCities.length > 0 ? activeCities.length : 7}</span>
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
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Developer:</strong> Remington Homes (low-rise division)</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Parent Company:</strong> The Remington Group Inc.</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Founded:</strong> ~1990 (35+ years low-rise brand)</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Headquarters:</strong> Vaughan (Concord), Ontario</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Operating Entity:</strong> Calsper Developments Inc.</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Property Types:</strong> Townhomes, Detached, Bungalows, Estate Homes, Condominiums</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
              Key Development Regions
            </h2>
            <div className="space-y-4 text-sm text-slate-300 font-sans">
              <div>
                <strong className="text-white font-mono text-xs uppercase block text-indigo-400">GTA & Regional Footprint</strong>
                <p className="text-xs mt-1">Active across York Region (Markham, Vaughan, King City), Peel Region (Brampton), Halton Region (Oakville, Georgetown), and Simcoe County (Barrie).</p>
              </div>
              <div>
                <strong className="text-white font-mono text-xs uppercase block text-indigo-400">Signature Achievement</strong>
                <p className="text-xs mt-1">Downtown Markham — a 243-acre master-planned mixed-use community developed by The Remington Group.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16 border border-slate-800 bg-slate-900/20 p-6 sm:p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
            About Remington Homes
          </h2>
          <div className="space-y-4 text-sm text-slate-300 font-sans">
            <p>
              Remington Homes is the low-rise residential homebuilding arm of The Remington Group Inc., one of the Greater Toronto Area's larger privately held land developers. While The Remington Group's overall portfolio spans residential, commercial, retail and income-producing real estate, Remington Homes concentrates on ground-related housing: three-storey townhomes, freehold and rear-lane towns, detached homes, bungalows, and estate homes reaching more than 5,000 square feet.
            </p>
            <p>
              The company is family-controlled and was founded by Rudolph P. Bratty, a Toronto real-estate developer and lawyer who was named a 2024 appointee to the Order of Ontario. It is led by Rudolph Bratty (Chairman and CEO) and Jerry Bratty (Chief Operating Officer), with a third generation of the family—including Matthew Bratty, president of the Remington Homes homebuilding entity—now active in the business.
            </p>
            <p>
              Remington's position in the Ontario market is anchored by Downtown Markham, a 243-acre master-planned mixed-use community in Markham that the firm has led. Alongside that large urban project, Remington Homes builds smaller low-rise communities in suburban and exurban GTA locations, positioning itself in the move-up, estate and downsizer segments as well as first-time buyer townhomes.
            </p>
          </div>
        </section>

        {/* Regions & Cities Overview */}
        <section className="mb-16 border border-slate-800 bg-slate-900/20 p-6 sm:p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
            Ontario Market Presence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans">
            <div>
              <h3 className="font-bold text-indigo-400 font-mono text-xs uppercase mb-2">York Region</h3>
              <p className="text-slate-300">Remington's core market. Active in Markham with Downtown Markham development and Victory Green community, plus The Valley Woodbridge and Thornhill Trails in Vaughan, and Triple Crown Estates in King City.</p>
            </div>
            <div>
              <h3 className="font-bold text-indigo-400 font-mono text-xs uppercase mb-2">Peel & Halton Regions</h3>
              <p className="text-slate-300">Growing presence in Brampton with The Bright Side community, and established footprint in Oakville and Georgetown (Halton Hills) with Juniper Gate bungalow community.</p>
            </div>
            <div>
              <h3 className="font-bold text-indigo-400 font-mono text-xs uppercase mb-2">Simcoe County</h3>
              <p className="text-slate-300">Presence in Barrie through the South Barrie master-planned community, developed as a four-builder joint venture.</p>
            </div>
            <div>
              <h3 className="font-bold text-indigo-400 font-mono text-xs uppercase mb-2">Mixed-Use Development</h3>
              <p className="text-slate-300">Through The Remington Group's high-rise division, condominiums in Downtown Markham (Gallery Towers, Gallery Square) extend beyond low-rise housing.</p>
            </div>
          </div>
        </section>

        {/* Property Grid Section */}
        <section>
          <div className="text-xs tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
            <span>ACTIVE & FEATURED COMMUNITIES ({totalProjects > 0 ? totalProjects : 8})</span>
            <span className="text-slate-500">ONTARIO REGIONAL PORTFOLIO</span>
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
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">REGION</span>
                          <span className="font-medium text-slate-300 uppercase mt-1 block tracking-wider truncate">{property.city || 'Ontario'}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">FOOTPRINT</span>
                          <span className="font-medium text-slate-300 mt-1 block tracking-wider truncate">{property.sqft_text || 'See Specs'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-700/40 flex items-center justify-between">
                      <div>
                        <span className="block text-[8px] text-slate-500 uppercase tracking-widest">STARTING PRICE</span>
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
                <h3 className="text-lg font-bold text-white mt-2">Victory Green</h3>
                <p className="text-xs text-slate-400 mt-1">Markham, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Freehold Townhomes & Detached Homes</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">The Valley Woodbridge</h3>
                <p className="text-xs text-slate-400 mt-1">Vaughan, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Detached Homes & Townhomes</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">Triple Crown Estates</h3>
                <p className="text-xs text-slate-400 mt-1">King City, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Estate Homes & Townhomes</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">Thornhill Trails</h3>
                <p className="text-xs text-slate-400 mt-1">Vaughan, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Freehold Townhomes & Detached Singles</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">Juniper Gate</h3>
                <p className="text-xs text-slate-400 mt-1">Georgetown (Halton Hills), Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Bungalows & Townhomes</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">The Bright Side</h3>
                <p className="text-xs text-slate-400 mt-1">Brampton, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Townhomes & Detached Homes</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">South Barrie</h3>
                <p className="text-xs text-slate-400 mt-1">Barrie, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Detached Homes & Bungalows</div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● Active Community</span>
                <h3 className="text-lg font-bold text-white mt-2">Gallery Towers</h3>
                <p className="text-xs text-slate-400 mt-1">Downtown Markham, Ontario</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">Mixed-Use Condominiums</div>
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
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Who is Remington Homes?</h3>
              <p className="text-slate-300">Remington Homes is the low-rise homebuilding division of The Remington Group Inc., a privately held real estate developer based in Vaughan, Ontario. It builds townhomes, detached homes, bungalows and estate homes, primarily in the Greater Toronto Area.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Is Remington Homes the same as The Remington Group?</h3>
              <p className="text-slate-300">Yes. Remington Homes is the low-rise residential brand of The Remington Group Inc. The Remington Group also builds condominiums, commercial and retail real estate. The homebuilding operation trades as Calsper Developments Inc. operating as Remington Homes.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Where does Remington Homes build in Ontario?</h3>
              <p className="text-slate-300">Remington Homes builds in the Greater Toronto Area and nearby growth areas, including Markham, Vaughan (Woodbridge and Thornhill), King City, Brampton, Oakville, Georgetown (Halton Hills) and Barrie.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">What is Remington Homes' connection to Downtown Markham?</h3>
              <p className="text-slate-300">The Remington Group is the developer behind Downtown Markham, a 243-acre master-planned mixed-use community in Markham that includes residential, retail and office space.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">What types of homes does Remington Homes build?</h3>
              <p className="text-slate-300">Remington Homes builds townhomes (including three-storey and rear-lane freehold towns), detached homes, bungalows and estate homes, plus condominiums through The Remington Group's high-rise division.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Is Remington Homes a licensed builder in Ontario?</h3>
              <p className="text-slate-300">All new-home builders in Ontario must be licensed by the Home Construction Regulatory Authority (HCRA). Buyers should verify Remington's current licence status directly in the HCRA Ontario Builder Directory before purchasing.</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
