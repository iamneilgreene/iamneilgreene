import type { MKey } from './constants'
import type { Band } from './capability'

/* ═══════════════════════════════════════════════════════════════════════
   RESULT LANGUAGE — V1

   Score-band narratives and 30-day development prescriptions, transcribed
   from the V1 Pilot Specification.

   Breakpoint copy stays firm but is never shaming, and carries no alarm-red
   treatment in the UI: the message is priority and stabilisation, not a
   failure of identity.
   ═══════════════════════════════════════════════════════════════════════ */

export const BAND_NARRATIVES: Record<MKey, Record<Band, string>> = {
  mind: {
    breakpoint:
      'Your judgment and learning systems are not yet dependable enough for the decisions your life may require. Stabilise how you gather information, think, and decide before adding more complexity.',
    constraint:
      'You have useful knowledge, but it is not consistently converting into clear judgment, adaptation, or action. Mind is likely limiting the value of what you already know.',
    functional:
      'You can think and learn effectively under ordinary conditions, but the behaviour is not yet reliable enough to meet the standard across pressure, ambiguity, and change.',
    capable:
      'Your thinking is generally reliable. You usually learn, update, decide, and adapt well enough to support meaningful responsibility.',
    proven:
      'Your judgment has been repeatedly demonstrated across real decisions, changing conditions, and difficult problems. Mind is an established advantage.',
    exceptional:
      'Your judgment, learning, and adaptability are unusually strong and externally evident. You can reliably help other people think better, not merely think well yourself.',
  },
  means: {
    breakpoint:
      'You currently have too few usable resources, options, or forms of leverage. Dependence on a small number of people, systems, skills, or income sources creates material fragility.',
    constraint:
      'You have some useful resources, but they are not broad or dependable enough to create real optionality. Means is restricting what your knowledge and effort can produce.',
    functional:
      'You have workable skills, resources, relationships, and tools, but meaningful single points of dependence remain. The foundation works, but it is not yet resilient.',
    capable:
      'You generally have enough skills, resources, relationships, systems, and options to act without relying entirely on personal effort or one gatekeeper.',
    proven:
      'You have repeatedly converted assets, relationships, systems, technology, reputation, and capital into useful options and outcomes. Means is an established advantage.',
    exceptional:
      'Your resources and leverage are unusually deep, diversified, and transferable. You can create options for yourself and often for other people as well.',
  },
  measure: {
    breakpoint:
      'Your current physical, psychological, or operational capacity may fail under meaningful demand. Immediate focus should be on basic reliability, recovery, and the ability to remain useful.',
    constraint:
      'You can handle ordinary demands, but stress, fatigue, discomfort, or physical limitations regularly reduce your usefulness. Measure is restricting what the rest of your capability can carry.',
    functional:
      'You have useful capacity and resilience, but consistency under higher demand is not yet dependable. Your next step is to turn occasional performance into reliable readiness.',
    capable:
      'Your body, energy, resilience, and composure generally support your responsibilities. You can usually remain useful when demand rises.',
    proven:
      'You have repeatedly demonstrated physical and psychological reliability under real pressure. Measure is an established advantage, not merely an appearance.',
    exceptional:
      'Your capacity under demand is rare, repeatable, and externally evident. You can carry substantial pressure while remaining useful and helping stabilise others.',
  },
  mastery: {
    breakpoint:
      'Self-command or leadership reliability is not yet strong enough for significant responsibility. The first task is to govern your own behaviour before expanding what or whom you lead.',
    constraint:
      'You may carry responsibility, but inconsistency in standards, communication, emotional control, or follow-through is limiting trust and leadership effectiveness.',
    functional:
      'You can lead yourself and others in ordinary conditions, but your standards and stewardship are not yet reliable enough across conflict, pressure, and difficult decisions.',
    capable:
      'Your self-command, communication, standards, and follow-through generally support meaningful leadership and responsibility.',
    proven:
      'People and outcomes have repeatedly benefited from your leadership, standards, and stewardship. Mastery is an established advantage.',
    exceptional:
      'Your self-command and leadership are unusually consistent, externally trusted, and transferable. You develop capability in other people, not only in yourself.',
  },
}

/* ─── 30-day development prescriptions ─────────────────────────────────
   Only the primary plan expands by default. Four simultaneous improvement
   programmes is not a plan, it is a wish list.
   ──────────────────────────────────────────────────────────────────── */

export interface Plan {
  objective: string
  why: string
  actions: { title: string; detail: string }[]
  evidence: string
}

export const THIRTY_DAY_PLANS: Record<MKey, Plan> = {
  mind: {
    objective: 'Improve decision quality and convert learning into applied judgment.',
    why: 'Knowledge is not capability until it survives contact with a real decision.',
    actions: [
      {
        title: 'Decision Log',
        detail:
          'Record three meaningful decisions per week. Capture the decision, evidence used, assumptions, expected outcome, and what actually happened.',
      },
      {
        title: 'Applied Learning',
        detail:
          'Choose one subject or skill that matters now. Complete four focused sessions per week and produce one concrete output each week: a decision, summary, system, experiment, or behaviour change.',
      },
      {
        title: 'Red-Team Practice',
        detail:
          'Once per week, take one belief or plan that matters and deliberately look for credible evidence that could prove you wrong.',
      },
    ],
    evidence:
      '12 decision logs, 16 focused learning sessions, four applied outputs, and four red-team reviews.',
  },
  means: {
    objective: 'Increase usable options and reduce unnecessary dependence.',
    why: 'Means is not wealth. It is what you can actually mobilise when something is required of you.',
    actions: [
      {
        title: 'Means Map',
        detail:
          'Inventory current money and resources, skills, tools and technology, systems, relationships, reputation, assets, and every major single point of dependence.',
      },
      {
        title: 'Build One Multiplier',
        detail:
          'Select one high-leverage improvement — a valuable skill, an automation, a system, a key relationship, a financial buffer, or an owned asset — and work on it every week.',
      },
      {
        title: 'Create One New Option',
        detail:
          'Establish one credible alternative to a major dependency: another client pipeline, a transferable skill, a backup provider, a strategic relationship, an income option, or a documented system.',
      },
    ],
    evidence:
      'A completed Means Map, one multiplier materially improved, and one new option that did not exist at the start.',
  },
  measure: {
    objective: 'Increase reliable capacity under real-life demand.',
    why: 'Appearance is not capacity. The question is what you can still deliver when the week goes badly.',
    actions: [
      {
        title: 'Baseline',
        detail:
          'Establish simple personal baselines for strength and movement, conditioning, sleep and recovery, and daily energy, appropriate to your current health and circumstances.',
      },
      {
        title: 'Train Reliability',
        detail:
          'Complete a consistent weekly plan including appropriate strength, movement, and conditioning work rather than relying on occasional intense effort.',
      },
      {
        title: 'Pressure and Recovery',
        detail:
          'Deliberately practise one controlled form of discomfort or demanding work each week, then track how quickly useful performance and recovery return.',
      },
    ],
    evidence:
      'At least 12 planned training sessions, a weekly recovery review, and one repeatable performance marker improved or made more consistent.',
  },
  mastery: {
    objective: 'Strengthen self-command, trust, and stewardship.',
    why: 'Leadership of others is downstream of governing yourself first.',
    actions: [
      {
        title: 'One Non-Negotiable Standard',
        detail:
          'Choose one behaviour you will keep daily, or on every applicable occasion, for 30 days. Track it visibly.',
      },
      {
        title: 'Responsibility Review',
        detail:
          'Once per week, list the people, commitments, and outcomes currently depending on you. Identify one promise, conversation, decision, or follow-through item that needs attention, and close it.',
      },
      {
        title: 'Lead the Difficult Thing',
        detail:
          'Each week, address one conversation, decision, boundary, or responsibility you have been delaying because it is uncomfortable.',
      },
    ],
    evidence:
      'Adherence to the chosen standard, four responsibility reviews, and four delayed leadership actions addressed.',
  },
}

/** Development intensity guidance, keyed by the band of the priority dimension. */
export const INTENSITY_BY_BAND: Record<Band, string> = {
  breakpoint:
    'Stabilise. Reduce unnecessary complexity and fix the most basic reliability problem first.',
  constraint:
    'Remove the largest limiter. Focus on one or two behaviours that repeatedly create the problem.',
  functional:
    'Build consistency. Turn behaviours that happen sometimes into behaviours that are usually true.',
  capable:
    'Stress-test and strengthen. Preserve the standard while exposing the dimension to slightly greater responsibility.',
  proven:
    'Compound and transfer. Use the strength more deliberately, document evidence, and help others where appropriate.',
  exceptional:
    'Steward. Maintain humility, guard against overconfidence, and use exceptional capability to develop people, systems, or institutions beyond yourself.',
}

/** One immediate action the participant can begin this week. */
export const IMMEDIATE_ACTION: Record<MKey, string> = {
  mind: 'Before your next consequential decision, write down the evidence you are using and the assumption most likely to be wrong.',
  means: 'Name your single largest point of dependence today, and take the first concrete step toward one alternative.',
  measure:
    'Schedule three training or movement sessions into this week as fixed appointments, at a level you can actually keep.',
  mastery:
    'Identify the one conversation you have been avoiding, and put it on the calendar before the week ends.',
}
