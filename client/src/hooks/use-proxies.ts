import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useProxies() {
  return useQuery({
    queryKey: [api.proxies.list.path],
    queryFn: async () => {
      const res = await fetch(api.proxies.list.path);
      if (!res.ok) throw new Error("Failed to fetch proxies");
      return api.proxies.list.responses[200].parse(await res.json());
    },
  });
}

export function useProxy(id: number) {
  return useQuery({
    queryKey: [api.proxies.get.path, id],
    queryFn: async () => {
      // Manually build URL since we don't have the buildUrl helper exposed from shared yet
      // Assuming straightforward replacement for now or matching strict path
      const url = api.proxies.get.path.replace(':id', id.toString());
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch proxy");
      return api.proxies.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
