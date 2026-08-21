<script lang="ts">
    import { localStore } from "$lib/localStore.svelte";
    import { onMount } from "svelte";
    import Icon from '@iconify/svelte';

    let homepageSections = $state([
        "watchlist",
        "favorites",
        "top-rated",
        "genre:crime",
        "genre:drama",
        "genre:action",
        "genre:scifi",
    ]);
</script>

<div class="p-10">
    <h2 class="text-2xl font-bold mb-2">Customize Homepage</h2>
    <table class="table w-full rounded-box border border-base-content/5 table-zebra">
        <tbody>
            {#each homepageSections as section, i (section)}
                <tr>
                    <td class="w-0">
                        <div class="join">
                            <button class="btn btn-xs join-item btn-square" disabled={i === 0} title="Move Up">
                                <Icon icon="lucide:chevron-up" inline={true} width="18" />
                            </button>
                            <button class="btn btn-xs join-item btn-square" disabled={i === homepageSections.length - 1} title="Move Down">
                                <Icon icon="lucide:chevron-down" inline={true} width="18" />
                            </button>
                        </div>
                    </td>
                    <td>
                        {section}
                    </td>
                    <td class="w-0">
                        <button class="btn btn-xs btn-square btn-ghost hover:btn-error btn-circle" title="Remove Section">
                            <Icon icon="lucide:minus" inline={true} width="18" />
                        </button>
                    </td>
                </tr>
            {/each}
            <tr>
                <td colspan="3" class="text-center">
                    <button class="btn btn-sm btn-info btn-soft">
                        <Icon icon="lucide:plus" inline={true} />
                        Add Section
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>