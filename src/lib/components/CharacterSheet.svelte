<script lang="ts">
  import type { V20DarkAgesCharacter } from '$lib/types/character';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { Slider } from '$lib/components/ui/slider';
  import { Textarea } from '$lib/components/ui/textarea';
  import { toast } from 'svelte-sonner';
  import { Dice6, Save, Download, Upload } from 'lucide-svelte';
  import Papa from 'papaparse';

  export let character: V20DarkAgesCharacter;
  export let onSave: (updated: V20DarkAgesCharacter) => void;

  // Dice roller
  let dicePool = [5];           // ← must be array for shadcn Slider
  let difficulty = 6;
  let rollResults: number[] = [];
  let successes = 0;
  let isBotch = false;

  function rollDice() {
    rollResults = [];
    successes = 0;
    let ones = 0;

    for (let i = 0; i < dicePool[0]; i++) {
      const roll = Math.floor(Math.random() * 10) + 1;
      rollResults.push(roll);
      if (roll === 1) ones++;
      if (roll >= difficulty) successes++;
    }

    isBotch = successes === 0 && ones > 0;

    if (isBotch) {
      toast.error('💀 BOTCH!', { description: `${dicePool[0]}d10 @ diff ${difficulty}` });
    } else {
      toast.success(`${successes} Success${successes === 1 ? '' : 'es'}`, { description: `${dicePool[0]}d10 @ diff ${difficulty}` });
    }
  }

  function saveChanges() {
    character.updatedAt = new Date().toISOString();
    onSave(character);
    toast.success('Saved to Chronicle', { description: `${character.name} updated.` });
  }
  // CSV Export
  function exportCharacter() {
    const csv = Papa.unparse([character]);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name.replace(/[^a-z0-9]/gi, '_')}.csv`;
    a.click();
    toast.success('Exported', { description: `${character.name}.csv downloaded` });
  }

  // CSV Import (for this character only - updates current sheet)
  function importCharacter(e: Event) {
    console.log('importCharacter called', e);
    const file = (e.target as HTMLInputElement).files?.[0];
    let file2 = HTMLInputElement
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const imported = results.data[0] as V20DarkAgesCharacter;
        Object.assign(character, imported);
        saveChanges();
        toast.success('Imported', { description: 'Character data loaded from CSV' });
      }
    });
  }
</script>

<div class="max-w-5xl mx-auto p-8 space-y-10">
  <div class="flex justify-between items-center border-b border-zinc-800 pb-6">
    <form>
      <div>
        <h1 class="text-5xl font-bold text-red-500 tracking-tighter">{character.name}</h1>
        <p class="text-xl text-zinc-400 mt-1">{character.clan} • Generation {character.generation}</p>
      </div>
      <Button onclick={exportCharacter} variant="outline">
        <Download class="mr-2 h-4 w-4" /> Export CSV
      </Button>
      <label class="cursor-pointer">
        <Button onclick={importCharacter} type=file variant="outline" as="span">
          <Upload class="mr-2 h-4 w-4" /> Import CSV
          <input type="file" accept=".csv"/>
        </Button>
      </label>
      <Button onclick={saveChanges} size="lg" class="bg-red-600 hover:bg-red-700 text-lg px-8">
        <Save class="mr-3 h-5 w-5" /> Save to the Ages
      </Button>
    </form>
  </div>

  <Tabs value="rolls" class="w-full">
    <TabsList class="grid w-full grid-cols-5 bg-zinc-900 border border-zinc-800">
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="attributes">Attributes</TabsTrigger>
      <TabsTrigger value="rolls">Dice Roller</TabsTrigger>
      <TabsTrigger value="powers">Powers</TabsTrigger>
      <TabsTrigger value="notes">Notes</TabsTrigger>
    </TabsList>

    <TabsContent value="overview" class="mt-8">
      <Card class="bg-zinc-900 border-zinc-800">
        <CardContent class="pt-8 grid grid-cols-3 gap-12 text-center">
          <div>
            <div class="text-xs uppercase tracking-widest text-zinc-500">Road</div>
            <div class="text-4xl font-bold text-amber-400 mt-1">{character.roadRating}</div>
            <div class="text-sm text-zinc-400 mt-1">{character.road}</div>
          </div>
          <div>
            <div class="text-xs uppercase tracking-widest text-zinc-500">Blood Pool</div>
            <div class="text-5xl font-mono text-red-500 mt-1">{character.bloodPool.current}/{character.bloodPool.max}</div>
          </div>
          <div>
            <div class="text-xs uppercase tracking-widest text-zinc-500">Willpower</div>
            <div class="text-5xl font-mono mt-1">{character.willpower.current}/{character.willpower.max}</div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="attributes" class="mt-8">
      <Card class="bg-zinc-900 border-zinc-800">
        <CardHeader><CardTitle class="text-red-400">Attributes</CardTitle></CardHeader>
        <CardContent class="grid grid-cols-3 gap-10 pt-6">
          <div class="space-y-4">
            <h3 class="font-semibold text-red-400">Physical</h3>
            <p>Strength • {character.attributes.physical.strength}</p>
            <p>Dexterity • {character.attributes.physical.dexterity}</p>
            <p>Stamina • {character.attributes.physical.stamina}</p>
          </div>
          <div class="space-y-4">
            <h3 class="font-semibold text-red-400">Social</h3>
            <p>Charisma • {character.attributes.social.charisma}</p>
            <p>Manipulation • {character.attributes.social.manipulation}</p>
            <p>Appearance • {character.attributes.social.appearance}</p>
          </div>
          <div class="space-y-4">
            <h3 class="font-semibold text-red-400">Mental</h3>
            <p>Perception • {character.attributes.mental.perception}</p>
            <p>Intelligence • {character.attributes.mental.intelligence}</p>
            <p>Wits • {character.attributes.mental.wits}</p>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="rolls" class="mt-8">
      <Card class="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle class="flex items-center gap-4 text-2xl">
            <Dice6 class="h-8 w-8 text-red-500" /> Dark Ages Dice Roller
          </CardTitle>
        </CardHeader>
        <CardContent class="pt-8 space-y-10">
          <form on:submit|preventDefault={rollDice}>
            <div class="grid grid-cols-2 gap-12">
                <div>
                <Label for="dice-pool" class="block text-sm text-zinc-400 mb-4">Dice Pool</Label>
                <div class="flex items-center gap-6">
                    <Slider id="dice-pool" bind:value={dicePool} min={1} max={20} step={1} class="flex-1" />
                    <div class="font-mono text-5xl text-red-400 w-20 text-right">{dicePool[0]}</div>
                </div>
                </div>
                <div>
                <Label for="difficulty" class="block text-sm text-zinc-400 mb-4">Difficulty</Label>
                <select 
                    id="difficulty" 
                    bind:value={difficulty}
                    class="w-full h-14 bg-zinc-900 border border-zinc-700 rounded-lg px-4 text-lg focus:outline-none focus:border-red-600"
                >
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                </select>
                </div>
            </div>

            <Button type=submit size="lg" class="w-full h-16 text-xl bg-red-600 hover:bg-red-700">
                ROLL THE BONES
            </Button>
          </form>
          {#if rollResults.length > 0}
            <div class="bg-zinc-950 border border-zinc-800 rounded-2xl p-10">
              <div class="flex flex-wrap gap-4 justify-center mb-8">
                {#each rollResults as roll}
                  <div class="w-16 h-16 flex items-center justify-center text-4xl font-bold rounded-xl border-4 transition-all
                    {roll === 1 ? 'bg-red-950 border-red-600 text-red-400 scale-110' : 
                     roll >= difficulty ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-zinc-900 border-zinc-700 text-zinc-400'}">
                    {roll}
                  </div>
                {/each}
              </div>
              <div class="text-center text-6xl font-bold tracking-tighter {isBotch ? 'text-red-500' : 'text-emerald-400'}">
                {isBotch ? 'BOTCH' : successes + ' SUCCESS' + (successes === 1 ? '' : 'ES')}
              </div>
            </div>
          {/if}
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="powers" class="mt-8 text-zinc-400">Disciplines coming in the next update.</TabsContent>
    <TabsContent value="notes" class="mt-8">
      <Textarea bind:value={character.notes} placeholder="Scribe your secrets..." class="min-h-[300px] bg-zinc-950 border-zinc-800 text-lg" />
    </TabsContent>
  </Tabs>
</div>
