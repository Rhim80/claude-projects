[![Claude Code for Non-Coders](https://substackcdn.com/image/fetch/$s_!fnHc!,w_80,h_80,c_fill,f_auto,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F554aa08c-eb5b-4608-8bf6-37c64e03a6c7_1024x1024.png)](https://claudecodefornoncoders.substack.com/)

# [Claude Code for Non-Coders](https://claudecodefornoncoders.substack.com/)

SubscribeSign in

# Week 4: Advancing from Level 1 (Basic Prompting) to Level 2 (Prompt Engineering)

### Turn Raw Data Into Executive Insights - Your First AI-Driven Automated Report System

[![Daniel Williams's avatar](https://substackcdn.com/image/fetch/$s_!SxMs!,w_36,h_36,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F61af7482-da16-464b-9c1c-81bc273e250e_400x400.jpeg)](https://substack.com/@dewilliamsco)

[Daniel Williams](https://substack.com/@dewilliamsco)

Sep 22, 2025

1

[View comments (0)](https://claudecodefornoncoders.substack.com/p/week-4-advancing-from-level-1-basic/comments)

Share

**Hey there, strategic orchestrators!**

Quick question: What separates executives who always seem to have insightful data at their fingertips from those scrambling to piece together last-minute reports?

It's not longer hours or better memory. It's **systematized intelligence**.

Three weeks ago, we started this journey with basic Claude Code interactions. Today, we're making the leap that helps you on your journey from someone who "uses AI occasionally" to someone who "orchestrates AI strategically."

If you missed my deep dive on [AI Competence and Mastery levels](https://dewilliamsco.substack.com/p/ai-competence-and-mastery-for-everyone), take 3 minutes to read it. Today's exercise moves you definitively from Level 1 to Level 2, and what you build this week becomes the foundation for everything we'll do next.

Subscribe

* * *

## The Executive Intelligence Gap

Here's what most professionals do when they need to analyze data:

- Export spreadsheets to desktop

- Manually calculate basic metrics

- Copy/paste numbers into PowerPoint

- Hope they didn't miss anything important

- Send reports that are already outdated


Here's what we're building instead: **An intelligent report system that transforms raw business data into executive-ready insights in under 5 minutes.**

[![](https://substackcdn.com/image/fetch/$s_!7i-s!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F04b44482-48d7-47f5-984c-5ce2b2a67459_2602x1566.png)](https://substackcdn.com/image/fetch/$s_!7i-s!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F04b44482-48d7-47f5-984c-5ce2b2a67459_2602x1566.png)

* * *

## Your Data Playground: Real Business Scenarios

I've prepared five realistic datasets for you to practice with:

- **Sales Performance Data** (39 transactions across regions and products)

- **Marketing Campaign Results** (24 campaigns with full ROI metrics)

- **Customer Analysis Data** (20 enterprise customers with lifetime value)

- **Employee Survey Results** (30 responses across departments)

- **Inventory Management Data** (25 products with stock and performance metrics)


_Download all five datasets [here](https://drive.google.com/file/d/1czz2g6NKPSIN70-rWWZqeD5VXUC5dDFu/view?usp=sharing) – we'll use them throughout this exercise._

* * *

## Building Your Executive Intelligence System

### Phase 1: Engineer Your Analysis Partner (Context Setting)

Open Claude Code and create this foundational prompt:

```
You are my Executive Data Intelligence System. Your role is to transform raw business data into strategic insights that help me make better decisions.

ANALYSIS FRAMEWORK:
1. Executive Summary (3-4 key findings that matter to leadership)
2. Performance Metrics (quantified results with context)
3. Trend Analysis (what's changing and why it matters)
4. Risk & Opportunity Identification (what needs attention)
5. Strategic Recommendations (specific, actionable next steps)

MY LEADERSHIP STYLE:
- Focus on business impact over technical details
- Need context for why numbers matter
- Want specific recommendations, not just observations
- Appreciate honest assessment of both strengths and risks
- Think in quarterly and annual strategic cycles

DATA ANALYSIS APPROACH:
- Start with the most significant patterns
- Compare performance against industry standards when possible
- Identify outliers and explain their significance
- Connect data points to strategic implications
- Suggest specific actions based on findings

When I upload data or provide dataset information, analyze it through this lens and deliver insights in this format. Always ask clarifying questions about business context if needed.
```

### Phase 2: Test With Real Marketing Data

Let's start with the marketing campaign data. In Claude Code, continue:

```
I'm uploading our Q2 marketing campaign performance data. Here's the context:

BUSINESS CONTEXT:
- We're a B2B software company targeting mid-market businesses
- Marketing budget increased 40% this quarter
- New competitors entered our space in March
- Sales team reports longer deal cycles recently

STRATEGIC QUESTIONS:
1. Which campaigns are delivering real ROI vs. vanity metrics?
2. Where should we double down or cut spending?
3. What's working for our target audience profile?
4. How do we optimize the marketing-to-sales handoff?

Analyze the attached marketing_campaign_data.csv and provide strategic insights using our executive framework.
```

[![](https://substackcdn.com/image/fetch/$s_!N04V!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb4e2b6ed-acf6-4b96-9c68-b8220a23a947_2110x1518.png)](https://substackcdn.com/image/fetch/$s_!N04V!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb4e2b6ed-acf6-4b96-9c68-b8220a23a947_2110x1518.png)

_Upload the marketing data file and watch Claude Code work_

### Phase 3: Layer In Sales Intelligence

Now let's add sales data for a complete picture:

```
Now I'm adding our sales transaction data from the same period. Connect the marketing and sales data to answer:

SALES CONTEXT:
- Our average deal size target is $50K annually
- Enterprise customers (our most profitable segment) have 18-month sales cycles
- We're trying to expand in the North and West regions
- Sales team uses different approaches by customer type

KEY ANALYSIS NEEDED:
1. Marketing campaign → Sales conversion patterns
2. Regional performance variations and why
3. Customer type profitability analysis
4. Sales rep performance and territory optimization
5. Revenue predictability based on current pipeline

Analyze sales_data.csv alongside the marketing data for integrated strategic insights.
```

[![](https://substackcdn.com/image/fetch/$s_!2BBC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F70c58be5-a4a0-467a-b5e1-9c04783b3cd9_2074x1636.png)](https://substackcdn.com/image/fetch/$s_!2BBC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F70c58be5-a4a0-467a-b5e1-9c04783b3cd9_2074x1636.png)

### Phase 4: Create Your Reusable Templates

After Claude Code delivers your analysis, refine the system:

```
This analysis is valuable, but I need you to:

1. Create a "Monthly Executive Dashboard Template" based on this analysis approach
2. Design a standardized "Data Input Checklist" so I capture the right business context each time
3. Build a "Strategic Questions Bank" for different types of business analysis
4. Develop a "Action Priority Matrix" that ranks recommendations by impact and effort

Also, show me how to modify this system for different scenarios:
- Quarterly board presentations
- Department performance reviews
- Budget planning sessions
- Competitive response planning

This should become my go-to intelligence system for any business data analysis.
```

[![](https://substackcdn.com/image/fetch/$s_!gXZ7!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faa2d640d-8434-4b88-afa5-0e2658b88cd5_1146x1322.png)](https://substackcdn.com/image/fetch/$s_!gXZ7!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faa2d640d-8434-4b88-afa5-0e2658b88cd5_1146x1322.png)

[![](https://substackcdn.com/image/fetch/$s_!uuMz!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F984810e5-1684-4270-a556-53243e104afa_2288x1342.png)](https://substackcdn.com/image/fetch/$s_!uuMz!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F984810e5-1684-4270-a556-53243e104afa_2288x1342.png)

[![](https://substackcdn.com/image/fetch/$s_!nk79!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffb54dc56-31e6-4077-9789-1d11fa4b43f8_1142x1304.png)](https://substackcdn.com/image/fetch/$s_!nk79!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffb54dc56-31e6-4077-9789-1d11fa4b43f8_1142x1304.png)

[![](https://substackcdn.com/image/fetch/$s_!BJcW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0ab6489b-ee55-4645-afd8-8a9fdbdbee21_1058x1302.png)](https://substackcdn.com/image/fetch/$s_!BJcW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0ab6489b-ee55-4645-afd8-8a9fdbdbee21_1058x1302.png)

[![](https://substackcdn.com/image/fetch/$s_!m4W_!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3f34a22b-f40c-435e-acb7-777f75b1e77c_1332x1342.png)](https://substackcdn.com/image/fetch/$s_!m4W_!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3f34a22b-f40c-435e-acb7-777f75b1e77c_1332x1342.png)

[![](https://substackcdn.com/image/fetch/$s_!pxHG!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F34fea875-0bfa-4236-98ec-642ad475747e_2182x1416.png)](https://substackcdn.com/image/fetch/$s_!pxHG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F34fea875-0bfa-4236-98ec-642ad475747e_2182x1416.png)

The output of this prompt is a series of templates that you can use to automate executive reporting across a range of strategic areas, including marketing, sales, financials, customer analysis, operational performance, HR, products/services, and competitive analysis.

```
Generate an executive dashboard using the template for the company level as of Q2 2025 answering these questions:

- Which business lines/products have the highest margins?
- Where should we increase/decrease spending for maximum impact?
- Which revenue streams are most/least predictable?
- Which sales stages have the highest drop-off rates?
```

* * *

## The Compound Intelligence Effect

Here's what happens when you systematize business intelligence:

**Week 1:** 3 hours to manually analyze data → 30 minutes with your system

**Week 2:** Colleagues asking "How did you spot that trend?"

**Week 3:** Leadership requesting your analysis approach for other teams

**Week 4:** You're the person who "always has data-driven insights"

More importantly: **You're making better strategic decisions because you're analyzing data systematically instead of reactively.**

* * *

## Advanced Scenarios for This Week

Once you've mastered the basic system, try these challenges:

**Scenario A:** Combine employee survey data with performance metrics to identify retention risks

**Scenario B:** Use inventory data to optimize purchasing and identify profit opportunities

**Scenario C:** Cross-reference customer data with sales performance to design targeted campaigns

Each scenario builds your prompt engineering skills while solving real business problems.

* * *

## What This Really Teaches You

This exercise isn't just about data analysis – it's about **developing executive-level AI orchestration skills**:

- **Systems Thinking:** Building reusable intelligence instead of one-off requests

- **Strategic Context:** Teaching AI to think like a business leader, not just process data

- **Decision Architecture:** Structuring analysis to drive action, not just insight

- **Scalable Automation:** Creating templates that improve with each use


* * *

## Your Week 4 Challenge

**Build and test your Executive Intelligence System:**

1. **Monday:** Set up the core system with marketing data

2. **Wednesday:** Add sales data integration and refine insights

3. **Friday:** Test with a different dataset (employee survey or inventory)

4. **Bonus:** Create templates for three different business scenarios


**Share your results:** What insights did your system uncover that manual analysis would have missed?

* * *

## Week 5 Preview: Context Engineering Mastery

Next week, we're advancing to Level 2.5 – **Advanced Prompt Engineering with Memory**. You'll learn how to:

- Give Claude Code persistent memory about your business context

- Create specialized analysis personas for different situations

- Build cross-session intelligence that gets smarter over time

- Design prompt chains that handle complex, multi-step analysis


The goal: Claude Code that knows your business as well as your best analyst.

* * *

## The Strategic Reality Check

Your competitors are either still doing manual data analysis (giving you a massive time advantage) or they're using basic AI tools without systematic thinking (giving you a strategic intelligence advantage).

The question isn't whether to embrace AI-powered business intelligence. The question is whether you'll build systematic, strategic capabilities or just dabble with tools.

**Ready to become the executive who always has the right insights at the right time?**

Download the datasets, fire up Claude Code, and build your intelligence system.

* * *

_P.S. – If your current role doesn't give you access to business data, use these [sample datasets](https://drive.google.com/file/d/1czz2g6NKPSIN70-rWWZqeD5VXUC5dDFu/view?usp=sharing) to build the skills. The frameworks you develop now will be immediately applicable when you have real data to analyze._

Claude Code for Non-Coders is a reader-supported publication. To receive new posts and support my work, consider becoming a free or paid subscriber.

Subscribe

1

[View comments (0)](https://claudecodefornoncoders.substack.com/p/week-4-advancing-from-level-1-basic/comments)

Share

#### Discussion about this post

CommentsRestacks

![User's avatar](https://substackcdn.com/image/fetch/$s_!TnFC!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Favatars%2Fdefault-light.png)

TopLatestDiscussions

No posts

Ready for more?

Subscribe
