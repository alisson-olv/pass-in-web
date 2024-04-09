import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'lucide-react';
import { ptBR } from "date-fns/locale";
import { formatRelative } from "date-fns/formatRelative";
import { IconButton } from './icon-button';
import { Table } from './tables/table';
import { TableHeader } from './tables/table-header';
import { TableCell } from './tables/table-cell';
import { TableRow } from './tables/table-row';
import { attendees } from '../data/attendees';
import { useEffect, useState } from 'react';

export function AttendeeList() {
  const [data, setData] = useState<Array | null>(null);

  useEffect(() => {
    async function getData() {
      const response = await fetch('http://localhost:3000/attendees?_page=1&_limit=10&_sort=name&_order=asc&q=ne');
      const json = await response.json();
      setData(json);
    }

    getData();
  }, [])

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

      <Table>
        <thead>
          <tr className='border-b border-white/10'>
            <TableHeader style={{ width: 48 }}>
              <input className='bg-black/20 rounded border border-white/18 text-orange-400 outline-none focus:ring-0' type="checkbox" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {
            data && data.map((attendees) => (
              <TableRow key={attendees.id}>
                <TableCell>
                  <input className='bg-black/20 rounded border border-white/18 text-orange-400 outline-none focus:ring-0' type="checkbox" />
                </TableCell>
                <TableCell>{attendees.id}</TableCell>
                <TableCell>
                  <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-zinc-50'>{attendees.name}</span>
                    <span>{attendees.email}</span>
                  </div>
                </TableCell>
                <TableCell>{formatRelative(attendees.createdAt, new Date(), { locale: ptBR, })}</TableCell>
                <TableCell>{formatRelative(attendees.checkedInAt, new Date(), { locale: ptBR, })}</TableCell>
                <TableCell>
                  <IconButton transparent={true}>
                    <MoreHorizontal size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>Mostrando 1 de 200 itens</TableCell>
            <TableCell className='text-right' colSpan={3}
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
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}