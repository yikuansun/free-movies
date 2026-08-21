<script lang="ts">
    import { localStore } from "$lib/localStore.svelte";
    import { onMount } from "svelte";
    import Icon from '@iconify/svelte';
    import { availableHomepageSectionKeys, homepageSectionsMap } from "$lib/data/homepageSections";

</script>

<div class="p-10">
    <h2 class="text-2xl font-bold mb-2">Customize Homepage</h2>
    <table class="table w-full rounded-box border border-base-content/5 table-zebra">
        <tbody>
            {#each localStore.homepageLayout as sectionId, i (sectionId)}
                <tr>
                    <td class="w-0">
                        <div class="join">
                            <button class="btn btn-xs join-item btn-square" disabled={i === 0} title="Move Up"
                                onclick={() => {
                                    const newLayout = [...localStore.homepageLayout];
                                    newLayout[i - 1] = localStore.homepageLayout[i];
                                    newLayout[i] = localStore.homepageLayout[i - 1];
                                    localStore.homepageLayout = newLayout;
                                }}>
                                <Icon icon="lucide:chevron-up" inline={true} width="18" />
                            </button>
                            <button class="btn btn-xs join-item btn-square" disabled={i === localStore.homepageLayout.length - 1} title="Move Down"
                                onclick={() => {
                                    const newLayout = [...localStore.homepageLayout];
                                    newLayout[i + 1] = localStore.homepageLayout[i];
                                    newLayout[i] = localStore.homepageLayout[i + 1];
                                    localStore.homepageLayout = newLayout;
                                }}>
                                <Icon icon="lucide:chevron-down" inline={true} width="18" />
                            </button>
                        </div>
                    </td>
                    <td>
                        {homepageSectionsMap[sectionId].displayName}
                    </td>
                    <td class="w-0">
                        <button class="btn btn-xs btn-square btn-ghost hover:btn-error btn-circle" title="Remove Section"
                            onclick={() => {
                                localStore.homepageLayout = localStore.homepageLayout.filter((id) => id !== sectionId);
                            }} disabled={localStore.homepageLayout.length === 1}>
                            <Icon icon="lucide:minus" inline={true} width="18" />
                        </button>
                    </td>
                </tr>
            {/each}
            <tr>
                <td colspan="3" class="text-center">
                    <div class="dropdown">
                        <div tabindex="0" role="button" class="btn btn-sm btn-info btn-soft" aria-disabled={localStore.homepageLayout.length >= availableHomepageSectionKeys.length}>
                            <Icon icon="lucide:plus" inline={true} />
                            Add Section
                        </div>
                        <ul tabindex="-1" class="menu dropdown-content bg-base-200 rounded-box z-1 p-2 min-w-full shadow-md">
                            {#each availableHomepageSectionKeys.filter((sectionId) => !localStore.homepageLayout.includes(sectionId)) as sectionId (sectionId)}
                                <li>
                                    <button onclick={() => {
                                        localStore.homepageLayout = [...localStore.homepageLayout, sectionId];
                                    }}>
                                        {homepageSectionsMap[sectionId].displayName}
                                    </button>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>