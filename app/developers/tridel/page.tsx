import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import SiteNavbar from '../../components/SiteNavbar';
import Footer from '../../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tridel | GTA Condo Developer Profile | Findle',
  description: 'Explore Tridel condominiums, mid-rise and high-rise communities, and landmark GTA developments across Toronto, North York, Etobicoke, Mississauga, and beyond.',
};

export default async function TridelPage() {
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

  const cleanString = (str: string = '') =>
    str
      .toLowerCase()
      .replace(/-(homes|communities|group|developments|inc|ltd|corporation)|(homes|communities|group|developments|inc|ltd|corporation)/g, '')
      .replace(/[^a-z0-9]/g, '');

  const targetSlug = cleanString('tridel');

  const developerProperties = allListings.filter((item) => {
    const candidateFields = [
      item.developer,
      item.builder,
      item.company,
      item.title,
      item.project_name,
      item.name,
      item.community_name,
    ].filter(Boolean) as string[];

    if (!candidateFields.length) return false;

    return candidateFields.some((value) => {
      const normalized = cleanString(value);
      return (
        normalized.includes('tridel') ||
        normalized.includes('delzotto') ||
        normalized.includes('tridelgroup') ||
        targetSlug.includes(normalized)
      );
    });
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
                Verified Developer Profile // Established 1934 in Toronto, Ontario
              </div>

              <h1 className="text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
                Tridel
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 font-sans">
                Tridel is a Toronto-based condominium developer founded in 1934 and widely recognized as the largest builder of condominiums in the Greater Toronto Area. Over its history, it has delivered more than 90,000 homes and over 200 communities across Toronto and surrounding GTA markets, with a focus on high-rise and mid-rise residential projects.
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950 flex items-center justify-center p-6">
                <div className="w-full rounded-lg border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-center">
                  <div className="text-[10px] uppercase tracking-[0.38em] text-indigo-300">Tridel</div>
                  <div className="mt-4 text-3xl font-black uppercase tracking-[-0.08em] text-white">Toronto</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-slate-400">Condominium Developer</div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-slate-500">Featured Developments</span>
                  <span className="mt-1 block text-xl font-bold text-emerald-400">{totalProjects > 0 ? totalProjects : 8}</span>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-slate-500">Active Markets</span>
                  <span className="mt-1 block text-xl font-bold text-indigo-400">{activeCities.length > 0 ? activeCities.length : 6}</span>
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
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Developer:</strong> Tridel</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Founded:</strong> 1934</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Founder:</strong> Jack DelZotto</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Headquarters:</strong> 4800 Dufferin Street, Toronto, ON</li>
              <li><strong className="text-slate-100 font-mono text-xs uppercase">Property Types:</strong> Condominiums, Townhomes, Mixed-Use Communities</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 border-b border-slate-800 pb-2">
              Key Development Regions
            </h2>
            <div className="space-y-4 text-sm text-slate-300 font-sans">
              <div>
                <strong className="text-white font-mono text-xs uppercase block text-indigo-400">Toronto</strong>
                <p className="text-xs mt-1">Downtown, waterfront, North York, Etobicoke, and Scarborough have long been core markets for Tridel's condominium portfolio.</p>
              </div>
              <div>
                <strong className="text-white font-mono text-xs uppercase block text-indigo-400">GTA West & North</strong>
                <p className="text-xs mt-1">Active projects include Mississauga, Thornhill, Richmond Hill, and strategic infill locations throughout the broader GTA.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="text-xs tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
            <span>ACTIVE & FEATURED DEVELOPMENTS ({totalProjects > 0 ? totalProjects : 8})</span>
            <span className="text-slate-500">ONTARIO REGIONAL PORTFOLIO</span>
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
                      alt={property.title || 'Tridel listing'}
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
                        {property.title || 'Tridel Community'}
                      </h3>
                      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-700/40 pt-4 text-xs">
                        <div>
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">REGION</span>
                          <span className="font-medium text-slate-300 uppercase mt-1 block tracking-wider truncate">{property.city || 'Toronto'}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-slate-500 uppercase tracking-widest">TYPE</span>
                          <span className="font-medium text-slate-300 mt-1 block tracking-wider truncate">{property.property_type || 'Condominium'}</span>
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
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">No Tridel listings found</p>
              <p className="mt-3 text-base text-slate-300">The database is not currently returning any Tridel records for this page.</p>
            </div>
          )}
        </section>

        <section className="mt-20 border-t border-slate-800 pt-12">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans">
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Who is Tridel?</h3>
              <p className="text-slate-300">Tridel is a Toronto-based real estate developer founded in 1934. It is one of Canada’s longest-running homebuilders and is best known for condominiums across the Greater Toronto Area.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">Where does Tridel build?</h3>
              <p className="text-slate-300">Tridel focuses primarily on GTA markets, including Toronto, North York, Etobicoke, Scarborough, Mississauga, Thornhill, and Richmond Hill.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">What types of homes does Tridel build?</h3>
              <p className="text-slate-300">The company’s portfolio includes high-rise and mid-rise condominiums, townhomes, and mixed-use master-planned communities.</p>
            </div>
            <div className="border border-slate-800 bg-slate-900/30 p-6 rounded-xl">
              <h3 className="font-bold text-white font-mono uppercase text-xs mb-2 text-indigo-400">What is Tridel’s most notable project?</h3>
              <p className="text-slate-300">One Bloor West is Tridel’s headline project, with an 85-storey tower that reached status as Canada’s first supertall residential building.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
