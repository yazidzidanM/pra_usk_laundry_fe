export function useUpcase(nama: string, namauser: string, roleuser: string) {
  const capitalize = (str: string) =>
    str?.charAt(0)?.toUpperCase() + str?.slice(1);

  return {
    nama: capitalize(nama),
    namauser: capitalize(namauser),
    roleuser: capitalize(roleuser),
  };
}