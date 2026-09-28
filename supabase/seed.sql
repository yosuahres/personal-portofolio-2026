-- Writing posts. Run after both migrations in supabase/migrations (SQL editor, or `supabase db reset` locally).
-- Re-running is safe: an existing post with the same slug is updated in place.

insert into public.writing_posts (title, slug, excerpt, content, published_at)
values (
  'Practicing the Cut Before It Counts',
  'practicing-the-cut-before-it-counts',
  'What augmented reality could change about how surgeons learn fibula osteotomy, and what immersive programs like VRiMS already show about training doctors this way.',
  $md$
When someone loses part of their jaw to cancer or trauma, one of the most common ways to rebuild it is with their own leg. Surgeons take a section of the fibula, the thin bone on the outside of the lower leg, along with its blood supply, then cut it into segments and shape those segments into a new jaw.

That middle step is the fibula osteotomy. Each cut has to sit at the right position and the right angle, because the segments only form a convincing jawline if they meet cleanly. It's one of the most demanding parts of the whole reconstruction, and it's the part my paper, [Augmented Reality-Based Fibula Osteotomy Training Using visionOS](https://ieeexplore.ieee.org/document/11621473), focuses on.

## How surgeons learn it today

Much of surgical training still follows an old pattern: watch, assist, then do it under supervision. For a procedure like this, the chances to practice are limited. Cadavers are expensive and scarce, plastic bone models only go so far, and every real case belongs to a real patient.

Planning has improved. Surgeons can now plan the reconstruction on a computer from the patient's CT scan and print cutting guides that clip onto the bone. But planning a surgery on a screen isn't the same as building the hands-on judgment to perform it, and trainees still get relatively few repetitions before they're operating on people.

## Why augmented reality

Augmented reality places digital objects into the room you're already standing in. Instead of looking at a bone on a flat monitor, a trainee can see it in front of them at full scale, walk around it, and look at it from the angle they'd have at the operating table.

That matters for osteotomy because the skill is spatial. Understanding where a cut goes, and how the resulting segment will sit against its neighbor, is a three-dimensional problem. Apple's visionOS is built around exactly this kind of spatial computing, which made it a natural platform for exploring how osteotomy training could work in a headset.

## What this could change for doctors

The most direct benefit is more repetitions. If a resident can rehearse the planning and the cuts as many times as they need, without a cadaver or an operating room, they reach real cases with a clearer picture of the procedure in their head.

It also moves practice to where people are. A headset can be used in a teaching room, at home or in a hospital that doesn't have a simulation lab, so learning is less tied to access to expensive facilities.

And mistakes become free. In simulation, a badly placed cut is something to learn from, not something a patient pays for. That's the whole reason flight simulators exist, and surgery is gradually adopting the same idea.

## What VRiMS shows

This isn't hypothetical. [VRiMS](https://www.rcsengfutureofsurgeryfestival.co.uk/vrims-virtual-reality-in-medicine-and-surgery), short for Virtual Reality in Medicine and Surgery, is a group based at Queen Victoria Hospital in East Grinstead and Brighton and Sussex Medical School in the UK. They record operations as immersive 360° video, so a trainee wearing a headset sees the procedure from the surgeon's point of view, and they've built what they describe as the world's largest immersive surgical training repository.

The reach is what stands out. VRiMS reports running more than 250 workshops across UK medical schools in a single year and delivering over 10,000 immersive surgical training experiences. They also run a global health program that uses extended reality to train clinicians in low-resource settings in Africa, where access to operating theatres and specialist teachers is far more limited.

VRiMS is mostly about seeing: putting a learner inside a real operation. Augmented reality training like the one in my paper leans toward doing: letting a learner practice the steps themselves on a 3D model in their own space. The two fit together. Watch how an expert approaches a reconstruction, then rehearse it until the steps are familiar.

## What it doesn't replace

A headset doesn't recreate the feel of a saw meeting bone, and it can't teach everything an experienced surgeon passes on in the operating room. Tools like this need to be tested properly, with evidence that practice in the headset actually improves performance on real cases.

But as a way to give surgeons more practice, earlier and more often, before it counts, I think it's one of the more meaningful places extended reality can go.
$md$,
  now()
)
on conflict (slug) do update
set title = excluded.title,
    excerpt = excluded.excerpt,
    content = excluded.content;
