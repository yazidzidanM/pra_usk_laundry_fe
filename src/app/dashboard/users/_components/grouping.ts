export function groupUsersByOutlet(data: any[]) {
  const result: any = {};

  data?.forEach((item) => {
    const outlet = item?.id_outlet;
    if(outlet === null)return
    if (!result[outlet]) {
      result[outlet] = {
        outlet: `Outlet ${outlet}`,
        admin: 0,
        kasir: 0,
        owner: 0,
        user: 0,
      };
    }

    if (result[outlet][item.role] !== undefined) {
      result[outlet][item.role]++;
    }
  });

  return Object.values(result);
}
