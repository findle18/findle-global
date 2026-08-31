import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import SiteNavbar from '../../components/SiteNavbar';
import Footer from '../../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yorkwood Homes | GTA Builder Profile | Findle',
  description: 'Explore Yorkwood Homes—a family-run GTA builder specializing in detached homes, townhomes and semis in Caledon, East Gwillimbury, and across Ontario.',
};

export default async function YorkwoodHomesPage() {
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

  const developerProperties = allListings.filter((item) => {
    const developer = (item.developer || '').toLowerCase();
    return developer.includes('yorkwood');
  });

  const totalProjects = developerProperties.length;
  const activeCities = Array.from(new Set(developerProperties.map((p) => p.city))).filter(Boolean);

  return (
    <main className="min-h-screen bg-[#030305] text-slate-100 selection:bg-indigo-500 selection:text-white antialiased relative overflow-x-hidden font-mono">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent pointer-events-none z-0" />

      <SiteNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <section className="mb-16 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-7 lg:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-3 text-[9px] uppercase tracking-[0.22em] text-indigo-400">
                Verified Developer Profile // Family-Run GTA Homebuilder
              </div>

              <h1 className="text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
                Yorkwood Homes
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 font-sans">
                Yorkwood Homes is a family-run residential builder and developer headquartered in the Don Mills area of Toronto, Ontario. A three-generation homebuilder, Yorkwood specializes in low-rise, freehold family housing—detached single-family homes, townhomes and semi-detached homes—across the Greater Toronto Area, with current operations in Caledon, East Gwillimbury and surrounding growth markets.
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950 flex items-center justify-center p-6">
                <div className="w-full rounded-lg border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-center">
                  <div className="text-[10px] uppercase tracking-[0.38em] text-indigo-300">Yorkwood Homes</div>
                  <div className="mt-4 text-3xl font-black uppercase tracking-[-0.08em] text-white">GTA</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-slate-400">Homebuilder & Developer</div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-slate-500">Featured Developments</span>
                  <span className="mt-1 block text-xl font-bold text-emerald-400">{totalProjects > 0 ? totalProjects : 6}</span>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-slate-500">Active Markets</span>
                  <span className="mt-1 block text-xl font-bold text-indigo-400">{activeCities.length > 0 ? activeCities.length : 5}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 border border-slate-800 bg-slate-900/20 p-6 sm:p-8 rounded-2xl">
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
              Developer Snapshot
            </h2>
            <ul className="space-y-3 text-sm text-slate-300 font-sans">
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Developer:</strong> Yorkwood Homes</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Founded:</strong> ~1963</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Headquarters:</strong> 95 Barber Greene Rd, Don Mills (North York), Toronto, ON</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Owners:</strong> Norman Godfrey, Myer Godfrey</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Property Types:</strong> Detached Homes, Townhomes, Semi-Detached</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
              Key Development Regions
            </h2>
            <div className="space-y-4 text-sm text-slate-300 font-sans">
              <div>
                <strong className="text-white font-mono text-xs uppercase block text-indigo-400">Peel Region</strong>
                <p className="text-xs mt-1">Caledon: Yorkwood's most active current market with the master-planned Caledon Trails community developed jointly with Laurier Homes.</p>
              </div>
              <div>
                <strong className="text-white font-mono text-xs uppercase block text-indigo-400">York & Greater GTA</strong>
                <p className="text-xs mt-1">East Gwillimbury (Sharon Village), Richmond Hill, and extended GTA markets with a focus on family-oriented, low-rise communities.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="text-xs tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
            <span>ACTIVE & FEATURED DEVELOPMENTS ({totalProjects > 0 ? totalProjects : 6})</span>
            <span className="text-slate-500">GTA PORTFOLIO</span>
          </div>

          {developerProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {developerProperties.slice(0, 9).map((property) => (
                <Link
                  key={property.id}
                  href={`/directory/${property.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/40 hover:border-indigo-500/50 hover:bg-slate-900/60 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-500 cursor-pointer"
                >
                  <div className="aspect-[16/10] w-full bg-slate-950 relative overflow-hidden border-b border-slate-700/40">
                    <img
                      src={property.image_url || '/fallback-estate.jpg'}
                      alt={property.title || 'Yorkwood Homes listing'}
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
                        {property.title || 'Yorkwood Homes Community'}
                      </h3>
                      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-700/40 pt-4 text-xs">
                        <div>
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">REGION</span>
                          <span className="font-medium text-slate-300 uppercase mt-1 block tracking-wider truncate">{property.city || 'GTA'}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">TYPE</span>
                          <span className="font-medium text-slate-300 mt-1 block tracking-wider truncate">{property.property_type || 'Freehold'}</span>
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
            <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-8 text-center text-slate-300">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">No Yorkwood Homes listings found</p>
              <p className="mt-3 text-base text-slate-300">The database is not currently returning any Yorkwood Homes records for this page.</p>
            </div>
          )}
        </section>

        <section className="mt-20 border-t border-slate-800 pt-12">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans">
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Who is Yorkwood Homes?</h3>
              <p className="text-slate-300">Yorkwood Homes is a family-run residential builder and developer based in Don Mills, Toronto. A three-generation homebuilder owned and operated by Norman Godfrey and Myer Godfrey, it specializes in low-rise, freehold family housing across the GTA.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Where does Yorkwood Homes build?</h3>
              <p className="text-slate-300">Yorkwood builds across the Greater Toronto Area with current focus on Caledon (Caledon Trails) and East Gwillimbury (Sharon Village), plus past communities in Richmond Hill, Springwater and Toronto.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">What types of homes does Yorkwood Homes build?</h3>
              <p className="text-slate-300">Yorkwood specializes in low-rise, freehold family housing: detached single-family homes, freehold townhomes and semi-detached homes. The company does not build high-rise condominiums.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">What is Yorkwood building right now?</h3>
              <p className="text-slate-300">Caledon Trails (Mayfield Road & McLaughlin Road, Caledon, with Laurier Homes) and Sharon Village (East Gwillimbury) are currently selling. Windrose at Caledon Trails is a new release within Caledon Trails.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Does Yorkwood partner with other builders?</h3>
              <p className="text-slate-300">Yes. Caledon Trails is a joint venture with Laurier Homes (founded 1976), and Stonemanor Woods was developed with Tribute Communities. Yorkwood is also a member of BILD and the Canadian Home Builders' Association.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Are Yorkwood homes covered by warranty?</h3>
              <p className="text-slate-300">Yorkwood homes carry standard Tarion new-home warranty coverage: 7-year major structural, 2-year systems and building envelope, and 1-year on other items, as required for all new homes in Ontario.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
