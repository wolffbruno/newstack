import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Home() {
  return (
    <div className="flex flex-col bg-background justify-stretch min-h-screen gap-4 p-8 font-sans">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium tracking-tight">Máquinas virtuais</h1>
        <Button size="sm">
          Nova máquina virtual
        </Button>
      </div>
      <div className="overflow-x-auto ring-1 ring-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-[200px]">Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Flavor</TableHead>
              <TableHead>IP</TableHead>
              <TableHead className="w-[140px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">vm-web-01</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell><code>m1.small</code></TableCell>
              <TableCell><code>192.168.1.10</code></TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Detalhes</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">vm-db-01</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell><code>m1.medium</code></TableCell>
              <TableCell><code>192.168.1.11</code></TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Detalhes</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">vm-app-01</TableCell>
              <TableCell>Desligado</TableCell>
              <TableCell><code>m1.large</code></TableCell>
              <TableCell><code>-</code></TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Detalhes</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </div>
  );
}
