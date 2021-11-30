<script lang="ts">
	import { signIn, signOut, user } from '$lib/auth';
</script>

<h1>Hello {$user?.name ?? 'World'}!</h1>

{#if $user === undefined}
	<button on:click={signIn}>sign in</button>
{:else}
	<button on:click={signOut}>sign out</button>
{/if}
