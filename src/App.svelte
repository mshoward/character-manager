<script lang="ts">
  import { characters } from '$lib/stores/characters';
  import type { V20DarkAgesCharacter } from '$lib/types/character';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { toast } from 'svelte-sonner';
  import { Plus, User } from 'lucide-svelte';
  import CharacterSheet from '$lib/components/CharacterSheet.svelte';
  import { Toaster } from '$lib/components/ui/sonner';

  let newCharName = '';
  let showNewDialog = false;
  let showSheet = false;
  let selectedCharacter: V20DarkAgesCharacter | null = null;

  function createNewCharacter() {
    console.log("createNewCharacter called.");
    if (!newCharName.trim()) return;

    const newChar: V20DarkAgesCharacter = {
      id: crypto.randomUUID(),
      name: newCharName.trim(),
      clan: 'Ventrue',
      generation: 12,
      road: 'Road of Humanity',
      roadRating: 5,
      nature: 'Architect',
      demeanor: 'Architect',
      attributes: {
        physical: { strength: 2, dexterity: 2, stamina: 2 },
        social: { charisma: 2, manipulation: 2, appearance: 2 },
        mental: { perception: 2, intelligence: 2, wits: 2 }
      },
      abilities: { talents: {}, skills: {}, knowledges: {} },
      disciplines: {},
      backgrounds: {},
      virtues: { conscienceOrConviction: 3, selfControlOrInstinct: 3, courage: 3 },
      willpower: { current: 5, max: 5 },
      bloodPool: { current: 10, max: 10 },
      health: 'Healthy',
      experience: 0,
      spentExperience: 0,
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    characters.add(newChar);
    newCharName = '';
    showNewDialog = false;

    toast.success("Embraced", {description: `${newChar.name} has been brought into the night.`, duration: 5000} );
  }

  function openSheet(char: V20DarkAgesCharacter) {
    selectedCharacter = { ...char };
    showSheet = true;
  }

  function saveCharacter(updated: V20DarkAgesCharacter) {
    characters.update(updated);
    showSheet = false;
    selectedCharacter = null;
  }
</script>

<div class="min-h-screen bg-zinc-950 text-zinc-100 p-8">
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-12">
      <div>
        <h1 class="text-5xl font-bold tracking-tighter flex items-center gap-4">
          <span class="text-red-600 text-6xl">🩸</span> 
          V20 Dark Ages Chronicle
        </h1>
        <p class="text-zinc-400 mt-3 text-xl">Client-side • No server • Eternal</p>
      </div>
      <Dialog.Root>
        <Dialog.Trigger
            type="button"
            class={buttonVariants({ variant: "outline",}), "bg-red-800 hover:bg-red-900 text-lg px-24 justify-center rounded-3xl w-1/6 inline-flex whitespace-nowrap"}
          >
          <Plus class="h-6 w-6 shrink-0" />
          New Kindred
        </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-[425px]">
          <form on:submit={createNewCharacter}>
            <Dialog.Header>
              <Dialog.Title>Create New Vampire</Dialog.Title>
              <Dialog.Description>Enter the name of your new childe.</Dialog.Description>
            </Dialog.Header>
            <div class="grid gap-4">
              <div class="grid gap-3">
                <Label for="name">Name</Label>
                <Input id="name" bind:value={newCharName} placeholder="e.g. Lady Elysia of House Tremere" class="mt-2" />
              </div>
            </div>
            <Dialog.Footer>
              <Dialog.Close
                type="button"
                class={buttonVariants({ variant: "outline" })}
              >
                Cancel
              </Dialog.Close>
              <Button type="submit">Embrace</Button>
            </Dialog.Footer>
          </form>
          </Dialog.Content>
      </Dialog.Root>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each $characters as char (char.id)}
        <Card on:click={() => openSheet(char)} class="cursor-pointer bg-zinc-900 border-zinc-800 hover:border-red-900/70 hover:scale-[1.02] transition-all duration-300">
          <CardHeader>
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-zinc-800 rounded-full flex items-center justify-center">
                <User class="h-7 w-7 text-red-500" />
              </div>
              <div class="flex-1 min-w-0">
                <CardTitle class="text-2xl truncate">{char.name}</CardTitle>
                <CardDescription class="text-red-400">{char.clan} • Gen {char.generation}</CardDescription>
              </div>
              <div class="text-right">
                <span class="inline-block px-3 py-1 text-xs bg-emerald-900/70 text-emerald-400 rounded-full">
                  {char.health}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div class="text-zinc-500">Blood</div>
                <div class="font-mono text-red-400">{char.bloodPool.current}/{char.bloodPool.max}</div>
              </div>
              <div>
                <div class="text-zinc-500">Will</div>
                <div class="font-mono">{char.willpower.current}/{char.willpower.max}</div>
              </div>
              <div>
                <div class="text-zinc-500">Road</div>
                <div class="font-mono text-amber-400">{char.roadRating}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}

      {#if $characters.length === 0}
        <div class="col-span-full text-center py-24">
          <div class="text-8xl mb-6 opacity-40">🩸</div>
          <p class="text-3xl text-zinc-500">Your coterie is empty</p>
          <p class="text-zinc-400 mt-3">Create your first Kindred to begin</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<Dialog.Root bind:open={showSheet}>
  <Dialog.Content class="max-w-[1100px] max-h-[95vh] p-0 bg-zinc-950 border border-zinc-800 overflow-hidden">
    <Dialog.Header class="p-8 border-b border-zinc-800">
      <Dialog.Title class="text-3xl">Character Sheet</Dialog.Title>
    </Dialog.Header>
    {#if selectedCharacter}
      <CharacterSheet character={selectedCharacter} onSave={saveCharacter} />
    {/if}
  </Dialog.Content>
</Dialog.Root>

<Toaster />
