<script lang="ts">
  import type { V20DarkAgesCharacter } from '$lib/types/character';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { toast } from 'svelte-sonner';

  export let character: V20DarkAgesCharacter;
  export let onSave: (updated: V20DarkAgesCharacter) => void;

  function saveChanges() {
    character.updatedAt = new Date().toISOString();
    onSave(character);
    toast.success('Saved to Chronicle', {
      description: `${character.name} has been updated.`
    });
  }
</script>

<div class="p-12 bg-zinc-950">
  <h1 class="text-5xl font-bold text-red-500">{character.name}</h1>
  <p class="text-zinc-400 text-xl mt-2">{character.clan} • Generation {character.generation}</p>
  
  <Card class="mt-12 bg-zinc-900 border-zinc-800">
    <CardHeader>
      <CardTitle class="text-red-400">✅ Modal Test Successful</CardTitle>
    </CardHeader>
    <CardContent class="p-10 text-center">
      <p class="text-lg mb-8">If you can see this, the sheet modal is working!</p>
      <Button on:click={saveChanges} size="lg" class="bg-red-600 hover:bg-red-700">
        Save & Close Sheet
      </Button>
    </CardContent>
  </Card>
</div>
