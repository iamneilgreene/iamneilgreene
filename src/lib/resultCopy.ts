import type { MKey } from './constants'
import type { Band } from './capability'

/* ═══════════════════════════════════════════════════════════════════════
   RESULT LANGUAGE, V1

   Score-band narratives and 30-day development prescriptions, transcribed
   from the V1 Pilot Specification.

   Breakpoint copy stays firm but is never shaming, and carries no alarm-red
   treatment in the UI: the message is priority and stabilisation, not a
   failure of identity.
   ═══════════════════════════════════════════════════════════════════════ */

export const BAND_NARRATIVES: Record<MKey, Record<Band, string>> = {
  mind: {
    breakpoint: 'You reported that behaviors supporting learning, judgment, and adapting are rarely dependable. Start by reviewing a recent decision and the evidence you used; choose one manageable change.',
    constraint: 'Your responses suggest inconsistency in learning, judgment, and adapting. Review a recent decision and the evidence you used to decide whether this is a useful area to work on.',
    functional: 'You reported some consistency in learning, judgment, and adapting, with room to build. Check this pattern against a recent decision and the evidence you used.',
    capable: 'You usually report the behaviors supporting learning, judgment, and adapting. That meets this framework’s 8 standard; review a recent decision and the evidence you used to understand where the pattern holds.',
    proven: 'You reported frequent consistency in learning, judgment, and adapting. The score sits in the Proven range, but evidence is needed before treating that label as earned. Document a recent decision and the evidence you used.',
    exceptional: 'You consistently endorsed the behaviors supporting learning, judgment, and adapting. This is the top self-report range, not evidence of exceptional ability relative to others. Document a recent decision and the evidence you used and seek grounded feedback.',
  },
  means: {
    breakpoint: 'You reported that behaviors supporting resources, relationships, and usable options are rarely dependable. Start by reviewing a dependency and the alternatives actually available; choose one manageable change.',
    constraint: 'Your responses suggest inconsistency in resources, relationships, and usable options. Review a dependency and the alternatives actually available to decide whether this is a useful area to work on.',
    functional: 'You reported some consistency in resources, relationships, and usable options, with room to build. Check this pattern against a dependency and the alternatives actually available.',
    capable: 'You usually report the behaviors supporting resources, relationships, and usable options. That meets this framework’s 8 standard; review a dependency and the alternatives actually available to understand where the pattern holds.',
    proven: 'You reported frequent consistency in resources, relationships, and usable options. The score sits in the Proven range, but evidence is needed before treating that label as earned. Document a dependency and the alternatives actually available.',
    exceptional: 'You consistently endorsed the behaviors supporting resources, relationships, and usable options. This is the top self-report range, not evidence of exceptional ability relative to others. Document a dependency and the alternatives actually available and seek grounded feedback.',
  },
  measure: {
    breakpoint: 'You reported that behaviors supporting energy, recovery, and capacity under demand are rarely dependable. Start by reviewing a demanding week and the support that helped; choose one manageable change.',
    constraint: 'Your responses suggest inconsistency in energy, recovery, and capacity under demand. Review a demanding week and the support that helped to decide whether this is a useful area to work on.',
    functional: 'You reported some consistency in energy, recovery, and capacity under demand, with room to build. Check this pattern against a demanding week and the support that helped.',
    capable: 'You usually report the behaviors supporting energy, recovery, and capacity under demand. That meets this framework’s 8 standard; review a demanding week and the support that helped to understand where the pattern holds.',
    proven: 'You reported frequent consistency in energy, recovery, and capacity under demand. The score sits in the Proven range, but evidence is needed before treating that label as earned. Document a demanding week and the support that helped.',
    exceptional: 'You consistently endorsed the behaviors supporting energy, recovery, and capacity under demand. This is the top self-report range, not evidence of exceptional ability relative to others. Document a demanding week and the support that helped and seek grounded feedback.',
  },
  mastery: {
    breakpoint: 'You reported that behaviors supporting self-command, communication, and follow-through are rarely dependable. Start by reviewing a commitment and what you did to keep it; choose one manageable change.',
    constraint: 'Your responses suggest inconsistency in self-command, communication, and follow-through. Review a commitment and what you did to keep it to decide whether this is a useful area to work on.',
    functional: 'You reported some consistency in self-command, communication, and follow-through, with room to build. Check this pattern against a commitment and what you did to keep it.',
    capable: 'You usually report the behaviors supporting self-command, communication, and follow-through. That meets this framework’s 8 standard; review a commitment and what you did to keep it to understand where the pattern holds.',
    proven: 'You reported frequent consistency in self-command, communication, and follow-through. The score sits in the Proven range, but evidence is needed before treating that label as earned. Document a commitment and what you did to keep it.',
    exceptional: 'You consistently endorsed the behaviors supporting self-command, communication, and follow-through. This is the top self-report range, not evidence of exceptional ability relative to others. Document a commitment and what you did to keep it and seek grounded feedback.',
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
          'Select one high-leverage improvement, a valuable skill, an automation, a system, a key relationship, a financial buffer, or an owned asset, and work on it every week.',
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
    'Steward. Maintain humility, guard against overconfidence, and use your reported strengths to develop people, systems, or institutions beyond yourself.',
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
