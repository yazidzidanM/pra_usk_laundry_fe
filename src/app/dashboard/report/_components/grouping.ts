export function groupUsersByOutlet(data: any[]) {
  const grouped = data?.filter((i) => i.dibayar === "dibayar")?.reduce((acc, curr) => {
    if (!acc[curr.id_outlet]) {
      acc[curr.id_outlet] = {
        id_outlet: curr.id_outlet,
        total: curr.total,
      };
    } else {
      acc[curr.id_outlet].total += curr.total;
    }

    return acc;
  });
  return Object.values(grouped);
}
