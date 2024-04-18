import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'lucide-react';
import { ptBR } from "date-fns/locale";
import { formatRelative } from "date-fns/formatRelative";
import { IconButton } from './icon-button';
import { Table } from './tables/table';
import { TableHeader } from './tables/table-header';
import { TableCell } from './tables/table-cell';
import { TableRow } from './tables/table-row';
import { ChangeEvent, useEffect, useState } from 'react';
import { dataProps } from '../interfaces/data';

export function AttendeeList() {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [countPages, setCountPages] = useState(1);
  const totalPages = Math.ceil(totalItems / 10);
  const [user, setUser] = useState('');
  const [data, setData] = useState<dataProps[] | null>(null);

  useEffect(() => {
    async function getData() {
      const response = await fetch(`http://localhost:3000/attendees?_page=${page}&_limit=10&q=${user}`);
      const json = await response.json();
      setData(json);

      const countedItems = await fetch(`http://localhost:3000/attendees?q=${user}`)
      const totalCountedItems = await countedItems.json();
      setTotalItems(totalCountedItems.length);
    }

    getData();

  }, [page, user, setPage]);

  async function handleDeleteUser(userId: number) {
    try {
      await fetch(`http://localhost:3000/attendees/${userId}`, {
        method: 'DELETE',
      })

    } catch (error) {
      console.error('Erro ao excluir usuário', error);
    }
  }

  function goToNextPage() {
    if (page < totalPages) {
      setPage(page + 1);
      setCountPages(countPages + 1);
    }
  }

  function goToPrevPage() {
    if (page > 1) {
      setPage(page - 1);
      setCountPages(countPages - 1);
    }
  }

  function goToFirstPage() {
    setPage(1);
    setCountPages(1);
  }

  function goToLastPage() {
    setPage(totalPages);
    setCountPages(totalPages);
  }

  function searchUsers(event: ChangeEvent<HTMLInputElement>) {
    setUser(event.target.value);
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex gap-3 items-center flex-wrap">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm w-72 flex items-center gap-3">
          <Search width={16} className='text-emerald-300' />
          <input
            value={user}
            className="bg-transparent flex-1 border-0 text-sm focus:ring-0 focus:border-0"
            placeholder="Buscar participante..."
            onChange={searchUsers}
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
                  <IconButton onClick={() => handleDeleteUser(attendees.id)} transparent={true}>
                    <MoreHorizontal size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>Total de {totalItems} usuários</TableCell>
            <TableCell className='text-right' colSpan={3}
            >
              <div className='inline-flex gap-8 items-center'>
                <span>Página {countPages} de {totalPages}</span>

                <div className='flex gap-1.5'>
                  <IconButton onClick={goToFirstPage} disabled={countPages == 1 ? true : false}>
                    <ChevronsLeft size={16} />
                  </IconButton>
                  <IconButton onClick={goToPrevPage} disabled={countPages == 1 ? true : false}>
                    <ChevronLeft size={16} />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={countPages == totalPages ? true : false}>
                    <ChevronRight size={16} />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={countPages == totalPages ? true : false}>
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