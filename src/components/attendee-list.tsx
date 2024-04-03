import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'lucide-react';
import { IconButton } from './icon-button';

export function AttendeeList() {
  return (
    <div className='flex flex-col gap-4'>
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm w-72 flex items-center gap-3">
          <Search width={16} className='text-emerald-300' />
          <input
            className="bg-transparent flex-1 border-0 text-sm focus:ring-0 focus:border-0"
            placeholder="Buscar participante..."
          />
        </div>
      </div>

      <div className='border border-white/10 rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-white/10'>
              <th
                style={{ width: 48 }}
                className='py-3 px-4 text-sm font-semibold text-left'>
                <input className='bg-black/20 rounded border border-white/18 text-orange-400 outline-none focus:ring-0' type="checkbox" />
              </th>
              <th className='py-3 px-4 text-sm font-semibold text-left'>Código</th>
              <th className='py-3 px-4 text-sm font-semibold text-left'>Participante</th>
              <th className='py-3 px-4 text-sm font-semibold text-left'>Data de inscrição</th>
              <th className='py-3 px-4 text-sm font-semibold text-left'>Data do check-in</th>
              <th style={{ width: 64 }} className='py-3 px-4 text-sm font-semibold text-left'></th>
            </tr>
          </thead>
          <tbody>
            {
              Array.from({ length: 5 }).map(() => (
                <tr className='border-b border-white/10 hover:bg-white/5'>
                  <td className='py-3 px-4 text-sm text-zinc-300'>
                    <input className='bg-black/20 rounded border border-white/18 text-orange-400 outline-none focus:ring-0' type="checkbox" />
                  </td>
                  <td className='py-3 px-4 text-sm text-zinc-300'>12345</td>
                  <td className='py-3 px-4 text-sm text-zinc-300'>
                    <div className='flex flex-col gap-1'>
                      <span className='font-semibold text-zinc-50'>Alisson Souza</span>
                      <span>binho_alisson@hotmail.com</span>
                    </div>
                  </td>
                  <td className='py-3 px-4 text-sm text-zinc-300'>7 dias atrás</td>
                  <td className='py-3 px-4 text-sm text-zinc-300'>3 dias atrás</td>
                  <td className='py-3 px-4 text-sm text-zinc-300'>
                    <IconButton transparent={true}>
                      <MoreHorizontal size={16} />
                    </IconButton>
                  </td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td className='py-3 px-4 text-sm text-zinc-300' colSpan={3}>Mostrando 1 de 200 itens</td>
              <td
                className='py-3 px-4 text-sm text-zinc-300 text-right'
                colSpan={3}
              >
                <div className='inline-flex gap-8 items-center'>
                  <span>Página 1 de 10</span>

                  <div className='flex gap-1.5'>
                    <IconButton>
                      <ChevronsLeft size={16} />
                    </IconButton>
                    <IconButton>
                      <ChevronLeft size={16} />
                    </IconButton>
                    <IconButton>
                      <ChevronRight size={16} />
                    </IconButton>
                    <IconButton>
                      <ChevronsRight size={16} />
                    </IconButton>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}